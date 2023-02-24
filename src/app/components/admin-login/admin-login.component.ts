import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { User } from 'src/app/interfaces/user.interface';
import { Users } from 'src/app/models/userModel'
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public captchaResolved: boolean = false;
  token: string | undefined;
  submitted = false;
  loginForm!: FormGroup;

  isLoggedIn: boolean = false;
  authToken: string = ''


  constructor(private router: Router, private authService: AuthService) {
    this.token = undefined;
  }

  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  onSubmit() {
    const formData = this.loginForm.value as Partial<Users>
    this.submitted = true;
    console.log(formData.email);
    console.log(formData.password);
    if (this.loginForm.valid) {
      this.authService.loginUser(formData).subscribe(
        {
          next: (res) => {
            if (res.status === 200) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Sccessfully logged in',
                showConfirmButton: false,
                timer: 2500
              })
              this.authToken = res.data.token;
              this.authService.isLoggedIn = true;
              this.authService.saveToken(this.authToken);
              setTimeout(() => {
                location.href = "/dashboard";
              }, 1000)
            }
          },
          error: (err) => console.error(err),
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '\t invalid login form submission\n \tPlease remember to do our recaptcha challenge',

      })
    }

  }

  ngOnInit(): void {
    this.authService.decodeToken()
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'recaptchaReactive': new FormControl('',),
    })
  }

}



