import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsEnum } from 'src/app/utils/enums/enums-global';
import { Course } from 'src/app/utils/interfaces/course';
import { CoursesService } from '../courses.service';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  form!: FormGroup;
  course!: Course;
  action!: ActionsEnum;
  buildForm!: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }


  ngOnInit(): void {
    this.getParamsUrl();
  }

  getParamsUrl() {
    this.activatedRoute.params.pipe(take(2)).subscribe((params) => {
      const idCourse = params?.["id"] || 0;
      this.action = params?.["action"] as ActionsEnum;

      if (idCourse) {
        this.getCourseId(idCourse);
        return
      }

      this.initForm();

    });
  }

  getCourseId(id: number) {
    this.coursesService.getCourseId(id).pipe(first(observador => !!observador))
      .subscribe((course: Course) => {
        this.course = course;
        this.initForm();
      })
  }
  
  back() {
    this.router.navigateByUrl('courses');
  }

  private initForm() {


    if (this.action == ActionsEnum.edit) {
      const { id, courseName, credits, teachersName } = this.course;
      this.buildForm = {
        "id": [id],
        "courseName": [
          courseName,
          Validators.compose([
            Validators.required
          ])
        ],
        "credits": [
          credits,
          Validators.compose([
            Validators.required
          ])
        ],
        "teachersName": [
          teachersName,
          Validators.compose([
            Validators.required
          ])
        ]
      };

    } else {
      this.buildForm = {
        "courseName": [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        "credits": [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        "teachersName": [
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
      this.coursesService.putCourse(this.form.value)
        .pipe(first(observador => !!observador))
        .subscribe(() => {
          this.router.navigateByUrl('courses')
        });
    }
  }

  create() {
    if (this.form.valid) {
      this.coursesService.postCourse(this.form.value)
        .pipe(first(observador => !!observador))
        .subscribe(() => {
          this.router.navigateByUrl('courses')
        });
    }
  }

}
