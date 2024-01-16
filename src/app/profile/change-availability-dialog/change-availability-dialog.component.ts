import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Days } from 'src/app/Models/HomeData';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-availability-dialog',
  templateUrl: './change-availability-dialog.component.html',
  styleUrls: ['./change-availability-dialog.component.scss']
})
export class ChangeAvailabilityDialogComponent implements OnInit, OnDestroy{
    daysGroup = this._formBuilder.group({
    sundayControl: false,
    mondayControl: false,
    tuesdayControl: false,
    wednesdayControl: false,
    thursdayControl: false,
    fridayControl: false,
    saturdayControl: false,
  });
  subscription = new Subscription();
  data: AvailabilityInputs = {
    days: [],
    hours: []
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<ChangeAvailabilityDialogComponent>, @Inject(MAT_DIALOG_DATA) public initialData: AvailabilityInputs, private _formBuilder: FormBuilder) {
    this.data.hours = initialData.hours;
  }

  ngOnInit(): void {
    if (this.initialData.days.includes(Days.Sunday)) this.daysGroup.controls.sundayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Monday)) this.daysGroup.controls.mondayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Tuesday)) this.daysGroup.controls.tuesdayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Wednesday)) this.daysGroup.controls.wednesdayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Thursday)) this.daysGroup.controls.thursdayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Friday)) this.daysGroup.controls.fridayControl.patchValue(true);
    if (this.initialData.days.includes(Days.Saturday)) this.daysGroup.controls.saturdayControl.patchValue(true);

    this.subscription = this.daysGroup.valueChanges.subscribe(() => {
      this.data.days = [];
      if (this.daysGroup.controls.sundayControl.value) this.data.days.push(Days.Sunday);
      if (this.daysGroup.controls.mondayControl.value) this.data.days.push(Days.Monday);
      if (this.daysGroup.controls.tuesdayControl.value) this.data.days.push(Days.Tuesday);
      if (this.daysGroup.controls.wednesdayControl.value) this.data.days.push(Days.Wednesday);
      if (this.daysGroup.controls.thursdayControl.value) this.data.days.push(Days.Thursday);
      if (this.daysGroup.controls.fridayControl.value) this.data.days.push(Days.Friday);
      if (this.daysGroup.controls.saturdayControl.value) this.data.days.push(Days.Saturday);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.data.hours.push(value);
    }

    event.chipInput!.clear();
  }

  remove(hour: string): void {
    const index = this.data.hours.indexOf(hour);

    if (index >= 0) {
      this.data.hours.splice(index, 1);
    }
  }

  edit(hour: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(hour);
      return;
    }

    const index = this.data.hours.indexOf(hour);
    if (index >= 0) {
      this.data.hours[index] = value;
    }
  }

  returnDay(value: number): string {
    switch (value) {
      case 0:
          return "Niedziela";
      case 1:
          return "Poniedziałek";
      case 2:
          return "Wtorek";
      case 3:
          return "Środa";
      case 4:
          return "Czwartek";
      case 5:
          return "Piątek";
      case 6:
          return "Sobota";
      default:
        return 'Niedziela';
    }
  }
}

export interface AvailabilityInputs {
  days: Days[],
  hours: string[]
}
