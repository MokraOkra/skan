import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-address-dialog',
  templateUrl: './change-address-dialog.component.html',
  styleUrls: ['./change-address-dialog.component.scss']
})
export class ChangeAddressDialogComponent {
  changeAddressGroup = new FormGroup({
    cityControl: new FormControl('', Validators.required),
    streetControl: new FormControl('', Validators.required),
    buildingNumberControl: new FormControl(0, Validators.required),
  });
  subscription = new Subscription();
  data: AddressInputs = {
    city: '',
    street: '',
    building: 0
  }
  isValid = false;

  constructor(public dialogRef: MatDialogRef<ChangeAddressDialogComponent>, @Inject(MAT_DIALOG_DATA) public initialData: AddressInputs) {}
  
  ngOnInit(): void {
    this.changeAddressGroup.controls.cityControl.patchValue(this.initialData.city);
    this.changeAddressGroup.controls.streetControl.patchValue(this.initialData.street);
    this.changeAddressGroup.controls.buildingNumberControl.patchValue(this.initialData.building);
    this.changeAddressGroup.updateValueAndValidity();
    this.isValid = this.changeAddressGroup.valid
    this.subscription = this.changeAddressGroup.valueChanges.subscribe(() => {
      this.data.city = <string>this.changeAddressGroup.controls.cityControl.value;
      this.data.street = <string>this.changeAddressGroup.controls.streetControl.value;
      this.data.building = <number>this.changeAddressGroup.controls.buildingNumberControl.value;
      this.isValid = this.changeAddressGroup.valid
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export interface AddressInputs {
  city: string;
  street: string;
  building: number;
}
