import { NgModule } from "@angular/core";
import { MiniProfileComponent } from "./mini-profile.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [
      MiniProfileComponent,
    ],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        ToastrModule
    ],
    providers: [],
    exports: [MiniProfileComponent]
  })
  export class MiniProfileModule { }