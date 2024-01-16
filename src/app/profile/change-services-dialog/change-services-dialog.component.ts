import { Component, Inject } from '@angular/core';
import { Services } from 'src/app/Models/ReservationData';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-services-dialog',
  templateUrl: './change-services-dialog.component.html',
  styleUrls: ['./change-services-dialog.component.scss']
})
export class ChangeServicesDialogComponent {
  data: Services[] = [{
    serviceName: '',
    servicePrice: ''
  }]
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<ChangeServicesDialogComponent>, @Inject(MAT_DIALOG_DATA) public initialData: Services[]) {
    this.data = initialData;
  }

  remove(service: Services): void {
  }
  add(): void {
    this.data.push();
  }
}
