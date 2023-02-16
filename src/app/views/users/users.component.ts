import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { DummyUsers } from './dummy-users';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // private userService: UserService = inject(UserService);
  public users: User[] = DummyUsers;
  public search: string = '';
  private dialog!: MatDialog;
  private router!: Router;

  updateUserHandler(id: string) {
    this.router.navigate(['users', 'update', id]);
  }
}
