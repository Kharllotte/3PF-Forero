import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/utils/interfaces/student';
import { InscriptionService } from '../../inscription/inscription.service';
import { Course } from 'src/app/utils/interfaces/course';
import { CoursesService } from '../../courses/courses.service';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  student: Student;
}

@Component({
  selector: 'app-dialog-student-view',
  templateUrl: './dialog-student-view.component.html',
  styleUrls: ['./dialog-student-view.component.scss'],
})
export class DialogStudentViewComponent implements OnInit {
  listCourse: Course[] = [];

  displayedColumns: string[] = ['id', 'courseName', 'credits', 'teachersName'];
  dataSource = new MatTableDataSource<Course>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceInscription: InscriptionService,
    private serviceCourse: CoursesService
  ) {}

  ngOnInit() {
    console.log(this.data?.student);

    this.serviceInscription
      .getInscriptionByStudentId(this.data?.student.id)
      .subscribe({
        next: (listInscription) => {
          for (let i = 0; i < listInscription.length; i++) {
            this.getCourse(listInscription[i].course);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getCourse(idCourse: number): void {
    this.serviceCourse.getCourseId(idCourse).subscribe({
      next: (course) => {
        this.listCourse.push(course);
      },
      complete: () => {
        this.dataSource.data = this.listCourse;
      },
    });
  }
}
