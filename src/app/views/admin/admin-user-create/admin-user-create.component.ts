import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { AdminService } from 'src/app/services/admin.service';
import { User as Admin } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.scss'],
})
export class AdminUserCreateComponent {
  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  createForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(18),
    ]),
    profile_image: new FormControl('', []),
    mobile_number: new FormControl('', [Validators.required]),
    home_number: new FormControl('', [Validators.required]),
    status: new FormControl('', []),
    role: new FormControl(UserRole.ADMIN, []),
  });

  get first_name() {
    return this.createForm.controls['first_name'];
  }

  get last_name() {
    return this.createForm.controls['last_name'];
  }

  get email() {
    return this.createForm.controls['email'];
  }

  get password() {
    return this.createForm.controls['password'];
  }

  get profile_image() {
    return this.createForm.controls['profile_image'];
  }

  get mobile_number() {
    return this.createForm.controls['mobile_number'];
  }

  get home_number() {
    return this.createForm.controls['home_number'];
  }

  get status() {
    return this.createForm.controls['status'];
  }

  get role() {
    return this.createForm.controls['role'];
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
    this.adminService.createOne(this.createForm).subscribe({
      next: (resp: IApiResponse<Admin>) => {
        const timeout: number = 2000; // timeout in milliseconds
        if (resp.status === 201) {
          this.snackbar.open('Admin created successfully', undefined, {
            duration: timeout,
            panelClass: ['text-light', 'bg-success'],
          });

          setTimeout(() => {
            this.router.navigate(['/admins']);
          }, timeout);
        } else {
          this.snackbar.open('There was an error creating admin', undefined, {
            duration: timeout * 1.5,
          });
          console.error(resp.error);
        }
      },
      error: (error: HttpErrorResponse) => console.error(error),
    });
  }
}
