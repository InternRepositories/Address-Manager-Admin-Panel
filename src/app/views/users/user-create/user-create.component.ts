import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  constructor(
    private userService: UserService,
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
    mobile_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$'),
    ]),
    home_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$'),
    ]),
    status: new FormControl('PENDING', []),
    role: new FormControl('USER', []),
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

  createUser() {
    const form = new FormData();

    // append all data to the Form Data object from the Reactive form
    // this was done for file upload because reactive forms doesn't natively support file upload
    Object.keys(this.createForm.controls).forEach((key) => {
      form.append(key, this.createForm.controls[key].value);
    });

    this.userService.createOne(form).subscribe({
      next: (resp: IApiResponse<User>) => {
        const timeout: number = 2500; // timeout in milliseconds
        if (resp.status === 201) {
          // clear form data
          this.createForm.reset();
          this.snackbar.open('User created successfully', undefined, {
            duration: timeout,
            panelClass: ['success-snackbar'],
          });
        } else {
          this.snackbar.open('There was an error creating user', undefined, {
            duration: timeout,
          });

          console.error(resp.error);
        }
      },
      error: (error: HttpErrorResponse) =>
        console.error('Create One User Error', error.message),
    });
  }
}
