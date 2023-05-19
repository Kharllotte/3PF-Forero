import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription.component';



const routes: Routes = [
  {
    path: '',
    component: InscriptionComponent
  },
];

export const InscriptionRoutes = RouterModule.forChild(routes);
