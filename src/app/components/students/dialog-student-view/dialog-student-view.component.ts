import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/utils/interfaces/student';

export interface DialogData {
  student: Student
}

@Component({
  selector: 'app-dialog-student-view',
  templateUrl: './dialog-student-view.component.html',
  styleUrls: ['./dialog-student-view.component.scss']
})
export class DialogStudentViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data?.student);

  }

}
