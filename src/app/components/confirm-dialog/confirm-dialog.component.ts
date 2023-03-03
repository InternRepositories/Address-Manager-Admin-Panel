import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogConfig } from 'src/app/interfaces/confirm-dialog-config.interface';

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button (click)="cancelHandler()" mat-button mat-dialog-close>
        Cancel
      </button>
      <button
        (click)="confirmHandler()"
        mat-button
        mat-dialog-close
        cdkFocusInitial
      >
        Yes
      </button>
    </div>
  `,
  styleUrls: [],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  confirm: boolean = false;

  cancelHandler() {
    this.confirm = false;
  }

  confirmHandler() {
    this.confirm = true;
    this.dialogRef.close({ confirmed: this.confirm });
  }
}
