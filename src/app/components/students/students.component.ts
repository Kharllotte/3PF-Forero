import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from 'src/app/utils/interfaces/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActionsEnum } from 'src/app/utils/enums/enums-global';
import { MatDialog } from '@angular/material/dialog';
import { DialogStudentViewComponent } from './dialog-student-view/dialog-student-view.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listStudent: Student[] = [];

  constructor(private studentsService: StudentsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListStudents();
  }

  getListStudents() {
    this.studentsService.getListStudent().subscribe((data: Student[]) => {
      this.listStudent = data;
      this.dataSource.data = this.listStudent;
    })
  }

  edit(student: Student) {
    this.router.navigateByUrl(`/students/edit/${student.id}/${ActionsEnum.edit}`);
  }

  create() {
    this.router.navigateByUrl(`/students/create/${ActionsEnum.create}`);
  }

  delete(id: number) {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.getListStudents();
    })
  }

  popup(student: Student) {
    this.dialog.open(DialogStudentViewComponent, {
      data: {
        student
      },
    });
  }

}
