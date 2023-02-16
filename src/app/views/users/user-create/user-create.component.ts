import { Component } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  createForm = <User>{};
  userStatuses: string[] = Object.values(UserStatus);
  userRoles: string[] = Object.values(UserRole);

  //
}
