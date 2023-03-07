import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User as Admin } from '../../interfaces/user.interface';
import { ConfirmDialogConfig } from '../../interfaces/confirm-dialog-config.interface';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatus } from 'src/app/enums/user-status.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  admins: Admin[] = [];
  _admins: Admin[] = [];
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

  private adminIndexForDelete: number = 0;
  private dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {
    this.adminService.getAll().subscribe({
      next: (
        resp: IApiResponse<{ limit: number; page: number; users: Admin[] }>
      ) => {
        this.admins = resp.data.users;
        this._admins = this.admins.slice(0, 5);
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => {},
    });
  }

  onPaginatorChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.admins.length) endIndex = this.admins.length;
    this._admins = this.admins.slice(startIndex, endIndex);
  }

  searchAdminHandler(): void {
    this._admins = this._admins.filter((item: any) => {
      for (let prop in item) {
        if (Object.prototype.hasOwnProperty.call(item, prop)) {
          if (
            item[prop]
              .toString()
              .toLowerCase()
              .includes(this.search.toLocaleLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });

    // this.searchFields = [];
    // for (let field in this.searchForm) {
    //   const value = this.searchForm[field];
    //   if (value != '' && value != undefined && value != null) {
    //     this.searchFields.push(field);
    //   }
    // }
  }

  resetSearchHandler() {
    this.searchFields = [];
    this.adminService.getAll().subscribe({
      next: (
        resp: IApiResponse<{ limit: number; page: number; users: Admin[] }>
      ) => {
        this.admins = resp.data.users;
        this._admins = this.admins;
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  updateAdminHandler(id: string) {
    this.router.navigate(['admins', 'update', id]);
  }

  deleteAdminHandler(id: string) {
    this.adminIndexForDelete = this.admins.findIndex(
      (user: Admin) => user._id == id
    );

    this.dialogConfig = {
      title: 'Delete Admin',
      message: `Are you sure you want to delete ${
        this.admins[this.adminIndexForDelete].first_name
      } ${this.admins[this.adminIndexForDelete].last_name}`,
    };

    this.dialog
      .open(ConfirmDialogComponent, { data: this.dialogConfig })
      .afterClosed()
      .subscribe((response: any) => {
        // the dialog can be closed without the value of confirmed being set to a `boolean` value
        if (response['confirmed'] !== true) response['confirmed'] = false;

        if (response.confirmed === true) {
          this.deleteAdmin(this.admins[this.adminIndexForDelete]._id);
        }
      });
  }

  deleteAdmin(id: string): void {
    if (!id) {
      this.snackbar.open('We are unable to find that admin');
      return;
    }

    this.adminService.deleteOne(id).subscribe({
      next: (resp: IApiResponse<Admin>) => {
        if (resp.status === 200) {
          this.snackbar.open('Admin Deleted!', 'ok', { duration: 2500 });

          // Remove deleted admin from the array
          this._admins.splice(
            this._admins.findIndex((admin) => admin._id === id),
            1
          );

          // Remove deleted admin from the array
          this.admins.splice(
            this.admins.findIndex((admin) => admin._id === id),
            1
          );
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
