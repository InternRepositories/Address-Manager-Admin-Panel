import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { DummyUsers } from './dummy-users';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // private userService: UserService = inject(UserService);
  public users: User[] = DummyUsers;
}
