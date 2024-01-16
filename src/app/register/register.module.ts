import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [
      RegisterComponent,
    ],
    imports: [MatButtonModule, MatInputModule, ReactiveFormsModule
    ],
    providers: [],
  })
  export class RegisterModule { }