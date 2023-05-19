import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/app/utils/interfaces/course';
import { Student } from 'src/app/utils/interfaces/student';
import { InscriptionService } from './inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  buildForm!: any;
  form!: FormGroup;
  listCourses: Course[] = [];
  listStudent: Student[] = [];
  constructor(private router: Router,
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private inscriptionService: InscriptionService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getListCourse();
    this.getListStudent();
  }

  create() {
    if (this.form.valid) {
      this.inscriptionService.postInscription(this.form.value).subscribe(() => {

      })
    }
  }

  getListCourse() {
    this.coursesService.getListCourse().subscribe((data: Course[]) => {
      this.listCourses = data;
    })
  }

  getListStudent() {
    this.studentsService.getListStudent().subscribe((data: Student[]) => {
      this.listStudent = data;
    })
  }

  private initForm() {

    this.buildForm = {
      "student": [
        ,
        Validators.compose([
          Validators.required
        ])
      ],
      "course": [
        ,
        Validators.compose([
          Validators.required
        ])
      ]
    };

    this.form = this.fb.group(this.buildForm);
  }
}
