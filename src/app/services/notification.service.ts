import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackbar: MatSnackBar) {}

  open(
    message: string,
    action?: string,
    config?: MatSnackBarConfig,
    type?: NotificationType
  ) {
    if (type == NotificationType.SUCCESS) {
      config!['panelClass'] = ['success-snackbar'];
    } else if (type == NotificationType.ERROR) {
      config!['panelClass'] = ['error-snackbar'];
    }

    this._snackbar.open(message, action, config);
  }
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
