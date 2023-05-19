import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { EditCourseComponent } from './edit-course/edit-course.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },

  {
    path: 'edit/:id/:action',
    component: EditCourseComponent
  },
  {
    path: 'create/:action',
    component: EditCourseComponent
  },

];

export const CoursesRoutes = RouterModule.forChild(routes);
