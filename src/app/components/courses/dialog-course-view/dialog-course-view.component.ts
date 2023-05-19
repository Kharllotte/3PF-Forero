import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/utils/interfaces/course';
import { Student } from 'src/app/utils/interfaces/student';
import { InscriptionService } from '../../inscription/inscription.service';
import { StudentsService } from '../../students/students.service';

export interface DialogData {
  course: Course;
}

@Component({
  selector: 'app-dialog-course-view',
  templateUrl: './dialog-course-view.component.html',
  styleUrls: ['./dialog-course-view.component.scss']
})
export class DialogCourseViewComponent implements OnInit {
  listStudent: Student[] = [];

  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<Student>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceInscription: InscriptionService,
    private serviceStudent: StudentsService
  ) {}

  ngOnInit() {
    console.log(this.data?.course);

    this.serviceInscription
      .getInscriptionByCourseId(this.data?.course.id)
      .subscribe({
        next: (listInscription) => {
          for (let i = 0; i < listInscription.length; i++) {
            this.getStudent(listInscription[i].student);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getStudent(idStudent: number): void {
    this.serviceStudent.getStudentId(idStudent).subscribe({
      next: (student) => {
        this.listStudent.push(student);
      },
      complete: () => {
        console.log(this.listStudent)
        this.dataSource.data = this.listStudent;
      },
    });
  }

}
