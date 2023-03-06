import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogConfig } from 'src/app/interfaces/confirm-dialog-config.interface';
import { AuthService } from 'src/app/services/auth.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  private authService = inject(AuthService);
  private _snackbar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);

  logout() {
    const dialogConfig: ConfirmDialogConfig = {
      title: 'Logout',
      message: 'Would you like to logout?',
    };

    this._dialog
      .open(ConfirmDialogComponent, { data: dialogConfig })
      .afterClosed()
      .subscribe((isConfirmed) => {
        const confirmed = isConfirmed['confirmed'];

        if (!(confirmed == false || confirmed == undefined)) {
          this.authService.logOut();
        }
      });
  }
}
