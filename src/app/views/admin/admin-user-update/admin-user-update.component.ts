import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { AdminService } from 'src/app/services/admin.service';
import { User as Admin } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss'],
})
export class AdminUserUpdateComponent {
  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((res) => {
      this.adminService.getOne(res['id']).subscribe({
        next: (resp: IApiResponse<Admin>) => {
          if (resp.status === 200) {
            console.log('User loaded');
          } else {
            console.error(resp.error);
          }
        },
        error: (error: HttpErrorResponse) => {
          // TODO continue implement the integration for admin and user module
          if (error.status === 404)
            this.snackbar.open('User not found!', 'ok', { duration: 3000 });
          console.error('Error Getting One Admin', error.message);
        },
      });
    });
  }

  user: Admin = <Admin>{};

  createForm: FormGroup = new FormGroup({
    first_name: new FormControl(this.user.first_name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    last_name: new FormControl(this.user.last_name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    email: new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(18),
    ]),
    profile_image: new FormControl(this.user.profile_image, []),
    mobile_number: new FormControl(this.user.mobile_number, [
      Validators.required,
    ]),
    home_number: new FormControl(this.user.home_number, [Validators.required]),
    status: new FormControl(this.user.status, []),
    role: new FormControl(this.user.role, []),
  });

  get first_name() {
    return this.createForm.get('first_name');
  }

  get last_name() {
    return this.createForm.get('last_name');
  }

  get email() {
    return this.createForm.get('email');
  }

  get password() {
    return this.createForm.get('password');
  }

  get profile_image() {
    return this.createForm.get('profile_image');
  }

  get mobile_number() {
    return this.createForm.get('mobile_number');
  }

  get home_number() {
    return this.createForm.get('home_number');
  }

  get status() {
    return this.createForm.get('status');
  }

  get role() {
    return this.createForm.get('role');
  }

  userStatuses: string[] = Object.keys(UserStatus);
  userRoles: string[] = Object.keys(UserRole);
  previewImgUrl: string = '/assets/images/default_profile_image.png';
  confirm_password: string = '';

  previewImage(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.createForm.patchValue({ profile_image: file });

      var check = new FileReader();
      check.readAsDataURL(file);
      check.onload = (change: any) => {
        this.previewImgUrl = change.target.result;
      };
    }
  }

  createAdmin() {
    const form = new FormData();

    // append all data to the Form Data object from the Reactive form
    // this was done for file upload because reactive forms doesn't natively support file upload
    Object.keys(this.createForm.controls).forEach((key) => {
      form.append(key, this.createForm.controls[key].value);
    });

    this.adminService.createOne(form).subscribe({
      next: (resp: IApiResponse<Admin>) => {
        const timeout: number = 2500; // timeout in milliseconds
        if (resp.status === 201) {
          // clear form data
          this.createForm.reset();
          this.snackbar.open('Admin created successfully', undefined, {
            duration: timeout,
            panelClass: ['success-snackbar'],
          });
        } else {
          this.snackbar.open('There was an error creating admin', undefined, {
            duration: timeout,
          });

          console.error(resp.error);
        }
      },
      error: (error: HttpErrorResponse) =>
        console.error('Create One Admin Error', error.message),
    });
  }
}
