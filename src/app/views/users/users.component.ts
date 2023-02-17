import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../interfaces/user.interface';
import { DummyUsers } from './dummy-users';
import { ConfirmDialogConfig } from '../../interfaces/confirm-dialog-config';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = [];
  public _users: User[] = this.users.slice(0, 5);
  public search: string = '';
  public searchFields: string[] = [];
  public searchForm: Partial<User> = <User>{
    first_name: '',
    last_name: '',
    email: '',
  };

  private userIndexForDelete: number = 0;
  private dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private dialog: MatDialog /* private userService: UserService */,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getAll().subscribe({
      next: (resp) => {
        this.users = resp.data.users;
      },
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) endIndex = this.users.length;

    this._users = this.users.slice(startIndex, endIndex);
  }

  searchUserHandler(): void {
    this.searchFields = [];
    // TODO implement logic to search
  }

  resetSearchHandler() {
    this.searchFields = [];
  }

  updateUserHandler(id: string) {
    this.router.navigate(['users', 'update', id]);
  }

  deleteUserHandler(id: string) {
    this.userIndexForDelete = this.users.findIndex(
      (user: User) => user._id == id
    );

    this.dialogConfig = {
      message: `Are you sure you want to delete ${
        this.users[this.userIndexForDelete].first_name
      } ${this.users[this.userIndexForDelete].last_name}`,
      callback: this.deleteUser,
    };

    this.dialog.open(ConfirmDialogComponent, { data: this.dialogConfig });
  }

  deleteUser(user: User): void {
    // TODO implement logic for delete
  }
}
