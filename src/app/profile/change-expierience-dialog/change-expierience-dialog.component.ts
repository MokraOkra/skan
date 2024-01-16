import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-expierience-dialog',
  templateUrl: './change-expierience-dialog.component.html',
  styleUrls: ['./change-expierience-dialog.component.scss']
})
export class ChangeExpierienceDialogComponent implements OnInit, OnDestroy{
  htmlControl = new FormControl('', Validators.required);
  subscription = new Subscription();
  data: string = ''
  isValid = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(public dialogRef: MatDialogRef<ChangeExpierienceDialogComponent>, @Inject(MAT_DIALOG_DATA) public initialData: string) {}

  ngOnInit(): void {
    this.htmlControl.patchValue(this.initialData);
    this.htmlControl.updateValueAndValidity();
    this.isValid = this.htmlControl.valid
    this.subscription = this.htmlControl.valueChanges.subscribe(() => {
      this.data = <string>this.htmlControl.value;
      this.isValid = this.htmlControl.valid
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
