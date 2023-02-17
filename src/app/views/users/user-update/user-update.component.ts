import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  updateForm = <User>{};
  userStatuses: string[] = Object.values(UserStatus);
  userRoles: string[] = Object.values(UserRole);

  ngOnInit(): void {
    //
  }
}
