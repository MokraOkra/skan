import { NgModule } from "@angular/core";
import { ReservationComponent } from "./reservation.component";
import { MatIconModule } from "@angular/material/icon";
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [
      ReservationComponent,
    ],
    imports: [CommonModule, MatIconModule, MatRadioModule, FormsModule, MatButtonModule, ToastrModule
    ],
    providers: [],
  })
  export class ReservationModule { }