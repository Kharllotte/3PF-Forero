import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home', loadChildren: () =>
      import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'courses', loadChildren: () =>
      import('./components/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'inscription', loadChildren: () =>
      import('./components/inscription/inscription.module').then(m => m.InscriptionModule)
  },
  {
    path: 'students', loadChildren: () =>
      import('./components/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


