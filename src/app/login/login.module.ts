import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      LoginComponent,
    ],
    imports: [MatButtonModule, MatInputModule, ReactiveFormsModule
    ],
    providers: [],
  })
  export class LoginModule { }