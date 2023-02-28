import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { IApiResponse } from 'src/app/interfaces/api-response';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { User as Admin } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss'],
})
export class AdminUserUpdateComponent {
  user: Admin = <Admin>{};

  updateForm: FormGroup = new FormGroup({
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
    return this.updateForm.get('first_name');
  }

  get last_name() {
    return this.updateForm.get('last_name');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get profile_image() {
    return this.updateForm.get('profile_image');
  }

  get mobile_number() {
    return this.updateForm.get('mobile_number');
  }

  get home_number() {
    return this.updateForm.get('home_number');
  }

  get status() {
    return this.updateForm.get('status');
  }

  get role() {
    return this.updateForm.get('role');
  }

  userStatuses: string[] = Object.keys(UserStatus);
  userRoles: string[] = Object.keys(UserRole);
  defaultImgUrl: string = '/assets/images/default_profile_image.png';
  previewImgUrl: string = this.defaultImgUrl;
  confirm_password: string = '';

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((res) => {
      this.adminService.getOne(res['id']).subscribe({
        next: (resp: IApiResponse<Admin>) => {
          if (resp.status === 200) {
            this.user = resp.data;
            // manually set user role beacause it isn't sent from the API
            this.user.role = UserRole.ADMIN;

            // set user mage preview
            this.previewImgUrl = `http://localhost:5000/${this.user.profile_image?.replaceAll(
              '\\',
              '/'
            )}`;

            // Update reactive form values using data pulled from the database
            for (const formControl in this.updateForm.controls) {
              this.updateForm.controls[formControl].setValue(
                (this.user as any)[formControl]
              );
            }
          } else {
            console.error(resp.error);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404)
            this.snackbar.open('User not found!', 'ok', { duration: 3000 });
          console.error('Error Getting One Admin', error.message);
        },
      });
    });
  }

  previewImage(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.updateForm.patchValue({ profile_image: file });

      const check = new FileReader();
      check.readAsDataURL(file);
      check.onload = (change: any) => {
        this.previewImgUrl = change.target.result;
      };
    }
  }

  updateAdmin() {
    this.adminService
      .updateOne(this.user._id, this.reactiveFormToFormData(this.updateForm))
      .subscribe({
        next: (resp: IApiResponse<Admin>) => {
          const timeout: number = 2500; // timeout in milliseconds
          if (resp.status === 200) {
            this.snackbar.open('Updated successfully', undefined, {
              duration: timeout,
              panelClass: ['success-snackbar'],
            });
          } else {
            this.snackbar.open('There was an error updating admin', undefined, {
              duration: timeout,
            });

            console.error(resp.error);
          }
        },
        error: (error: HttpErrorResponse) =>
          console.error('Update One Admin Error', error.message),
      });
  }

  /**
   * Transform a reactive form to form data
   * @param reactiveForm Reactive form that will be transformed to form data
   * @returns { FormData }
   */
  reactiveFormToFormData(reactiveForm: FormGroup): FormData {
    const formData = new FormData();
    const formControls = Object.keys(reactiveForm.controls);

    // used a for loop instead of a forEach for speedy implementation
    for (let index = 0; index < formControls.length; index++) {
      const key = formControls[index];
      formData.append(key, reactiveForm.controls[key].value);
    }

    return formData;
  }
}
