import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      NavigationComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule],
    exports: [NavigationComponent],
    providers: [],
  })
  export class NavigationModule { }