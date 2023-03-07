import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/directives/custom.validator';
import { Users } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  submitted = false;

  resetPassword = new FormGroup({
    'password': new FormControl('', [Validators.required]),
    'repassword': new FormControl('', [Validators.required]),
  },
    { validators: [Validation.match('password', 'repassword')] }

  )

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.submitted = true;
    const formData = this.resetPassword.value as Partial<Users>
    const email = localStorage.getItem('email')
    console.log(email);

    if (this.resetPassword.valid) {
      this.authService.resetPassword(formData, email).subscribe(res => {


        Swal.fire(
          'Request Sent!',
          'Password successfully reset',
          'success'
        )
        this.router.navigate(['/login']);
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'invalid login form submission',

      })

    }




  }

}
