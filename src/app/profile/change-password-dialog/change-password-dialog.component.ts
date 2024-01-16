import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit, OnDestroy {
  changePasswordGroup = new FormGroup({
    passwordControl: new FormControl('', Validators.required),
    confirmPasswordControl: new FormControl('', Validators.required),
  });
  subscription = new Subscription();
  data: PasswordInputs = {
    password: '',
    password2: ''
  }
  isValid = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {}
  
  ngOnInit(): void {
    this.subscription = this.changePasswordGroup.valueChanges.subscribe(() => {
      this.data.password = <string>this.changePasswordGroup.controls.passwordControl.value;
      this.data.password2 = <string>this.changePasswordGroup.controls.confirmPasswordControl.value;
      this.isValid = this.changePasswordGroup.valid
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export interface PasswordInputs {
  password: string;
  password2: string;
}
