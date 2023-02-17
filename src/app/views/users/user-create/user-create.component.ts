import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  private userService!: UserService;

  createForm = <User>{};
  userStatuses: string[] = Object.values(UserStatus);
  userRoles: string[] = Object.values(UserRole);

  createUser(userData: Partial<User>) {
    this.userService.createOne(userData).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
}
