import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { ConfirmDialogConfig } from 'src/app/interfaces/confirm-dialog-config.interface';
import { User as Admin } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { IAddress } from 'src/app/interfaces/address.interface';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss'],
})
export class AdminUserDetailComponent implements OnInit {
  adminUserKeys: string[] = [
    'first_name',
    'last_name',
    'email',
    'mobile_number',
    'home_number',
  ];
  addressKeys: string[] = ['address_1', 'address_2', 'city', 'parish'];

  admin: Admin = <Admin>{};
  addresses: IAddress[] = [];
  dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    // this.userService.().subscribe({
    //   next: (resp: IApiResponse<Address[]>) => {
    //     // this.address
    //   },
    //   error: (error: HttpErrorResponse) =>
    //     console.error('Error getting admin', error.message),
    // });
  }

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (resp: any) => {
        this.userService.getOne(resp['id']).subscribe({
          next: (resp: IApiResponse<Admin>) => {
            this.admin = resp.data;

            // manually update the localhost url to match the resource path of the api
            this.admin.profile_image = `http://localhost:5000/${this.admin.profile_image}`;
          },
          error: (error: HttpErrorResponse) =>
            console.error('Error getting admin', error.message),
        });
      },
    });
  }

  deleteAdminHandler(id: string) {
    this.dialogConfig = {
      title: 'Delete Admin',
      message: `Are you sure you want to delete ${this.admin.first_name} ${this.admin.last_name}`,
    };

    this.dialog
      .open(ConfirmDialogComponent, { data: this.dialogConfig })
      .afterClosed()
      .subscribe((response: any) => {
        // the dialog can be closed without `confirmed` being set to a `boolean` value
        if (response['confirmed'] === undefined) response['confirmed'] = false;

        // delete the admin if confirmed is `true`
        if (response['confirmed'] === true) {
          this.deleteAdmin(this.admin._id);
        }
      });
  }

  deleteAdmin(id: string): void {
    if (!id) {
      this.snackbar.open('Unable to find admin');
      return;
    }

    this.userService.deleteOne(id).subscribe({
      next: (resp: IApiResponse<Admin>) => {
        if (resp.status === 200) {
          this.snackbar.open('Admin Deleted!', 'ok', { duration: 2500 });
        } else {
          this.snackbar.open('Error Deleting Admin!', 'ok', {
            duration: 2500,
          });
        }
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }
}
