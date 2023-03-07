import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { User } from 'src/app/interfaces/user.interface';
import { Users } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  user!: User
  userImage: string = ""

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private authService: AuthService, private userService: UserService) {
    super();
  }


  getProfileImage(): void {
    this.authService.getProfile()
    this.userService.getOne(this.authService.decodedToken.id).subscribe(res => {
      this.user = res.data
      this.userImage = "http://localhost:5000/" + res.data.profile_image
    })
  }

  logOutUser() {
    this.authService.logOut()
  }
  ngOnInit(): void {
    this.getProfileImage()

  }
}

