import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from '../../../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.scss'],
})
export class AdminUserCreateComponent {
  private userService!: UserService;
  private snackbar!: MatSnackBar;

  createForm = <User>{ role: UserRole.ADMIN };
  userStatuses: string[] = Object.values(UserStatus);
  userRoles: string[] = Object.values(UserRole);

  createAdmin() {
    this.userService.createOne(this.createForm).subscribe({
      next: (resp: IApiResponse<{ user: User }>) => {
        if (resp.status == 200) {
          this.snackbar.open('Admin Created!', undefined, { duration: 2500 });
        } else {
          this.snackbar.open('Error creating admin\nCheck console', undefined, {
            duration: 5000,
          });
          console.error(resp.error);
        }
      },
      error: (error: HttpErrorResponse) => console.error(error),
    });
  }
}
