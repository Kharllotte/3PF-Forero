import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, take } from 'rxjs';
import { Student } from 'src/app/utils/interfaces/student';
import { StudentsService } from '../students.service';
import { ActionsEnum } from 'src/app/utils/enums/enums-global';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {


  form!: FormGroup;
  student!: Student;
  action!: ActionsEnum;
  buildForm!: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    this.getParamsUrl();
  }

  getParamsUrl() {
    this.activatedRoute.params.pipe(take(2)).subscribe((params) => {
      const idStudent = params?.["id"] || 0;
      this.action = params?.["action"] as ActionsEnum;

      if (idStudent) {
        this.getStudentId(idStudent);
        return
      }

      this.initForm();

    });
  }

  getStudentId(id: number) {
    this.studentsService.getStudentId(id).pipe(first(observador => !!observador))
      .subscribe((student: Student) => {
        this.student = student;
        this.initForm();
      })
  }

  back() {
    this.router.navigateByUrl('students');
  }


  private initForm() {


    if (this.action == ActionsEnum.edit) {
      const { id, firstName, lastName } = this.student;
      this.buildForm = {
        "id": [id],
        "firstName": [
          firstName,
          Validators.compose([
            Validators.required
          ])
        ],
        "lastName": [
          lastName,
          Validators.compose([
            Validators.required
          ])
        ]
      };

    } else {
      this.buildForm = {
        "firstName": [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        "lastName": [
          '',
          Validators.compose([
            Validators.required
          ])
        ]
      };
    }

    this.form = this.fb.group(this.buildForm);
  }

  save() {

    if (this.form.valid) {
      this.studentsService.putStudent(this.form.value)
        .pipe(first(observador => !!observador))
        .subscribe(() => {
          this.router.navigateByUrl('students')
        });
    }
  }

  create() {
    if (this.form.valid) {
      this.studentsService.postStudent(this.form.value)
        .pipe(first(observador => !!observador))
        .subscribe(() => {
          this.router.navigateByUrl('students')
        });
    }
  }


}
