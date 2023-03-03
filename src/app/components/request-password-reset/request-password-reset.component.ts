import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  submitted = false;

  constructor(private authSerice: AuthService) { }

  requestForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'redirectLink': new FormControl('http://localhost:4200/#/resetPassword', [Validators.required]),
  },
  )

  onSubmit() {
    const formData = this.requestForm.value as Partial<Users>

    this.submitted = true

    if (this.requestForm.valid) {
      this.authSerice.requestPasswordReset(formData).subscribe(res => {
        console.log(res.data.email);
        localStorage.setItem('email', res.data.email)
        Swal.fire(
          'Request Sent!',
          '<a href = "https://mail.google.com/mail/u/1/#inbox">Open Email</a>',
          'success'
        )


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
