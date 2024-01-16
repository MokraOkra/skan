import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ChangeAvatarDialogComponent } from './change-avatar-dialog/change-avatar-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ChangeAvailabilityDialogComponent } from './change-availability-dialog/change-availability-dialog.component';
import { ChangeAddressDialogComponent } from './change-address-dialog/change-address-dialog.component';
import { ChangeExpierienceDialogComponent } from './change-expierience-dialog/change-expierience-dialog.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";
import { ChangeServicesDialogComponent } from './change-services-dialog/change-services-dialog.component';

@NgModule({
    declarations: [
      ProfileComponent,
      ConfirmDialogComponent,
      ChangePasswordDialogComponent,
      ChangeAvatarDialogComponent,
      ChangeAvailabilityDialogComponent,
      ChangeAddressDialogComponent,
      ChangeExpierienceDialogComponent,
      ChangeServicesDialogComponent,
    ],
    imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, AngularEditorModule, MatCheckboxModule, MatChipsModule, MatIconModule
    ],
    providers: [],
  })
  export class ProfileModule { }