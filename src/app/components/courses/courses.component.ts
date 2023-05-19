import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/utils/interfaces/course';
import { CoursesService } from './courses.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ActionsEnum } from 'src/app/utils/enums/enums-global';
import { MatDialog } from '@angular/material/dialog';
import { DialogCourseViewComponent } from './dialog-course-view/dialog-course-view.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'courseName', 'credits', 'teachersName', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listCourse: Course[] = [];
  
  constructor(private coursesService: CoursesService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListCourses();
  }

  getListCourses() {
    this.coursesService.getListCourse().subscribe((data: Course[]) => {
      this.listCourse = data;
      this.dataSource.data = this.listCourse;
    })
  }

  edit(course: Course) {
    this.router.navigateByUrl(`/courses/edit/${course.id}/${ActionsEnum.edit}`)
  }  

  create() {
    this.router.navigateByUrl(`/courses/create/${ActionsEnum.create}`);
  }

  delete(id: number) {
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.getListCourses();
    })
  }

  popup(course: Course) {
    this.dialog.open(DialogCourseViewComponent, {
      data: {
        course
      },
    });
  }

}
