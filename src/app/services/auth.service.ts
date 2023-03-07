import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/apiResponse';
import { IAuthResponse } from '../interfaces/authResponse';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Users } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.api.commonBaseUrl + environment.api.loginRoute;
  private RESET_URL = environment.api.commonBaseUrl + environment.api.resetRoute;
  private REQUEST_URL = environment.api.commonBaseUrl + environment.api.requestRoute;
  isLoggedIn: boolean = false;
  authToken!: string
  decodedToken: any
  expiresAt?: Date



  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  getErrorHandler(res: HttpErrorResponse): Observable<IAuthResponse> {
    if (res.error.error === 'Invalid password') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.error,

      })
      // window.alert(res.error.error)
      console.log(res.error.error)
    }
    else if (res.error.error === 'No user matches this email') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.error,

      })
      // window.alert(res.error.error)
      console.log(res.error.error)
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.error,

      })
      // window.alert(res.error.error)

      console.log(res.error.error);
    }
    return of(res.error.error);
  }

  logOut() {
    this.isLoggedIn = false;
    this.authToken = '';
    localStorage.removeItem('authToken');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User Sccessfully logged Out',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/login'])

  }

  private autoLogin(): void {
    let authToken = localStorage.getItem('authToken');


    if (authToken) {
      this.isLoggedIn = true;
      this.authToken = authToken;
    }
  }

  private autoLogout() {
    // if the token expires
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  loginUser(user: Partial<Users>): Observable<IAuthResponse<Users>> {
    return this.http.post<IAuthResponse<Users>>(`${this.API_URL}?platform=admin`, user).pipe(catchError(this.getErrorHandler))
  }


  getProfile() {
    let token: string | null = localStorage.getItem("authToken")
    if (token) {
      this.decodedToken = JSON.parse(atob(token.split(".")[1]))
      console.log("decoded token", this.decodedToken)
    }
  }

  // createUser(user: Partial<Users>): Observable<IAuthResponse<Users>> {
  //   return this.http.post<IAuthResponse<Users>>(`${this.API_URL}/users?platform=admin`, user).pipe(catchError(this.getErrorHandler))
  // }

  resetPassword(user: Partial<Users>, email: any): Observable<IApiResponse<Users>> {
    return this.http.post<IApiResponse<Users>>(`${this.RESET_URL}?platform=admin&email=${email}`, user).pipe(catchError(this.getErrorHandler))
  }


  requestPasswordReset(user: Partial<Users>): Observable<IApiResponse<Users>> {
    return this.http.post<IApiResponse<Users>>(`${this.REQUEST_URL}?platform=admin`, user).pipe(catchError(this.getErrorHandler))
  }


}
