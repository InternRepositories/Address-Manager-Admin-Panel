import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { ConfirmDialogConfig } from 'src/app/interfaces/confirm-dialog-config.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { IAddress } from 'src/app/interfaces/address.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userKeys: string[] = [
    'first_name',
    'last_name',
    'email',
    'mobile_number',
    'home_number',
  ];
  addressKeys: string[] = ['address_1', 'address_2', 'city', 'parish'];

  user: any = <User>{};
  addresses: any[] = [];
  dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (resp: any) => {
        const userId = resp['id'];
        this.userService.getOne(userId).subscribe({
          next: (resp: IApiResponse<User>) => {
            this.user = resp.data;

            // manually update the localhost url to match the resource path of the api
            this.user.profile_image = `http://localhost:5000/${this.user.profile_image}`;

            // load user addresses
            this.loadUserAddresses(userId);
          },
          error: (error: HttpErrorResponse) =>
            console.error('Error getting user', error.message),
        });
      },
    });
  }

  loadUserAddresses(id: string) {
    this.userService.getAddressesByUserId(id).subscribe({
      next: (resp: IApiResponse<IAddress[]>) => {
        this.addresses = resp.data;
      },
      error: (error: HttpErrorResponse) =>
        console.error('Error getting user addresses', error.message),
    });
  }

  deleteAddressHandler(id: string | undefined) {
    // TODO implement the delete address
  }

  deleteUserHandler(id: string) {
    this.dialogConfig = {
      title: 'Delete User',
      message: `Are you sure you want to delete ${this.user.first_name} ${this.user.last_name}`,
    };

    this.dialog
      .open(ConfirmDialogComponent, { data: this.dialogConfig })
      .afterClosed()
      .subscribe((response: any) => {
        // the dialog can be closed without `confirmed` being set to a `boolean` value
        if (response['confirmed'] === undefined) response['confirmed'] = false;

        // delete the user if confirmed is `true`
        if (response['confirmed'] === true) {
          this.deleteUser(this.user._id);
        }
      });
  }

  deleteUser(id: string): void {
    if (!id) {
      this.snackbar.open('Unable to find user');
      return;
    }

    this.userService.deleteOne(id).subscribe({
      next: (resp: IApiResponse<User>) => {
        if (resp.status === 200) {
          this.snackbar.open('User Deleted!', 'ok', { duration: 2500 });
        } else {
          this.snackbar.open('Error Deleting User!', 'ok', {
            duration: 2500,
          });
        }
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }
}
