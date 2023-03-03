import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  getUser!: User;
  userImage: String = '';
  selectedPic: String = '';
  name: String = '';

  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  updateUserDetails() {
    const form: any = new FormData();
    Object.keys(this.profileForm.controls).forEach((key) => {
      form.append(key, this.profileForm.controls[key].value);
    });
    this.userService
      .updateOne(this.authService.decodedToken.id, form)
      .subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            showConfirmButton: false,
            timer: 1500,
          });
          location.href = '/dashboard';
        },
        error: (err) => {
          throw err;
        },
      });
  }

  ngOnInit(): void {
    this.authService.getProfile();

    this.userService
      .getOne(this.authService.decodedToken.id)
      .subscribe((res) => {
        this.getUser = res.data;
        this.name = res.data.first_name;

        console.log(res.data);
        this.profileForm = new FormGroup({
          first_name: new FormControl(res.data.first_name),
          last_name: new FormControl(res.data.last_name),
          email: new FormControl(res.data.email),
          mobile_number: new FormControl(res.data.mobile_number),
          home_number: new FormControl(res.data.home_number),
          status: new FormControl(res.data.status),
          profile_image: new FormControl('', Validators.required),
        });

        this.userImage = 'http://localhost:5000/' + res.data.profile_image;
      });
  }

  onselectFile(event: any) {
    if (event.target.files) {
      this.selectedPic = event.target.files[0];
      var check = new FileReader();
      check.readAsDataURL(event.target.files[0]);
      check.onload = (change: any) => {
        this.userImage = change.target.result;

        this.profileForm.patchValue({ profile_image: this.selectedPic });
      };
    }
  }
}
