import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../interfaces/user.interface';
import { ConfirmDialogConfig } from '../../interfaces/confirm-dialog-config.interface';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { UserRole } from 'src/app/enums/user-role.enum';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];
  search: string = '';
  searchFields: string[] = [];
  status = UserStatus;
  userStatuses = Object.keys(UserStatus);
  searchForm: any = {
    first_name: '',
    last_name: '',
    email: '',
    status: '',
  };
  totalUsers = 0;
  searchParams = { page: 1, limit: 5, role: UserRole.USER };

  private userIndexForDelete: number = 0;
  private dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {
    this.userService.getAll(this.searchParams).subscribe({
      next: (
        resp: IApiResponse<{
          limit: number;
          page: number;
          count: number;
          users: User[];
        }>
      ) => {
        this.users = resp.data.users;
        this.totalUsers = resp.data.count;
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => {},
    });
  }

  onPaginatorChange(event: PageEvent) {
    this.searchParams.limit = event.pageSize;
    this.searchParams.page = event.pageIndex + 1;

    this.userService.getAll(this.searchParams).subscribe({
      next: (
        resp: IApiResponse<{
          limit: number;
          page: number;
          count: number;
          users: User[];
        }>
      ) => {
        this.users = resp.data.users;
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  searchUserHandler(): void {}

  resetSearchHandler() {
    this.searchFields = [];
    this.userService.getAll(this.searchParams).subscribe({
      next: (
        resp: IApiResponse<{
          limit: number;
          page: number;
          count: number;
          users: User[];
        }>
      ) => {
        this.users = resp.data.users;
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  deleteUserHandler(id: string) {
    this.userIndexForDelete = this.users.findIndex(
      (user: User) => user._id == id
    );

    this.dialogConfig = {
      title: 'Delete User',
      message: `Are you sure you want to delete ${
        this.users[this.userIndexForDelete].first_name
      } ${this.users[this.userIndexForDelete].last_name}`,
    };

    this.dialog
      .open(ConfirmDialogComponent, { data: this.dialogConfig })
      .afterClosed()
      .subscribe((response: any) => {
        // the dialog can be closed without the value of confirmed being set to a `boolean` value
        if (response['confirmed'] !== true) response['confirmed'] = false;

        if (response.confirmed === true) {
          this.deleteUser(this.users[this.userIndexForDelete]._id);
        }
      });
  }

  deleteUser(id: string): void {
    if (!id) {
      this.snackbar.open('We are unable to find that user');
      return;
    }

    this.userService.deleteOne(id).subscribe({
      next: (resp: IApiResponse<User>) => {
        if (resp.status === 200) {
          this.snackbar.open('User Deleted!', 'ok', { duration: 2500 });

          // Remove deleted user from the array
          const userIndex = this.users.findIndex((user) => user._id === id);
          this.users.splice(userIndex, 1);
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
