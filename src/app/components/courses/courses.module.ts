import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoursesRoutes } from "./courses.routing";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/utils/material/material.module";



@NgModule({
  declarations: [
    EditCourseComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    CoursesRoutes,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: []
})
export class CoursesModule { }
