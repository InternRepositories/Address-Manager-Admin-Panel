import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any) {
    this._snackbar.open(JSON.stringify(error, undefined, 3));
    return EMPTY;
  }

  constructor(private _snackbar: MatSnackBar) {}
}
