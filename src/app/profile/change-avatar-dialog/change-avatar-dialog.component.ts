import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-avatar-dialog',
  templateUrl: './change-avatar-dialog.component.html',
  styleUrls: ['./change-avatar-dialog.component.scss']
})
export class ChangeAvatarDialogComponent {
  avatarControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<ChangeAvatarDialogComponent>) {}
}
