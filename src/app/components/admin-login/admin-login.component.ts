import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public captchaResolved: boolean = false;
  token: string | undefined;
  submitted = false;
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;
  registrationInfo!: IUser;
  loginForm!: FormGroup;

  constructor() {
    this.token = undefined;
  }

  checkCaptcha(captchaResponse: any) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'recaptchaReactive': new FormControl('', [Validators.required]),
    })
  }

}



