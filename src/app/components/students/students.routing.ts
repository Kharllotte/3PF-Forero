import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'edit/:id/:action',
    component: EditStudentComponent
  },
  {
    path: 'create/:action',
    component: EditStudentComponent
  },
];

export const StudentsRoutes = RouterModule.forChild(routes);
