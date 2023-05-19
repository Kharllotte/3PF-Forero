import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InscriptionRoutes } from "./inscription.routing";
import { MaterialModule } from "src/app/utils/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InscriptionComponent } from "./inscription.component";

@NgModule({
  declarations: [InscriptionComponent],
  imports: [
    CommonModule,
    InscriptionRoutes,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class InscriptionModule { }
