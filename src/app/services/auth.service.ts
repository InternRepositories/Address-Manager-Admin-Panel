import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/apiResponse'
import { IAuthResponse } from '../interfaces/authResponse'
import { Users } from '../models/userModel'
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.api.commonBaseUrl + environment.api.loginRoute;
  isLoggedIn: boolean = false;
  authToken: string = ''


  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  getErrorHandler(res: HttpErrorResponse): Observable<IAuthResponse> {
    if (res.error.error === 'Invalid password') {
      window.alert(res.error.error)
      console.log(res.error.error)
    }
    else if (res.error.error === 'No user matches this email') {
      window.alert(res.error.error)
      console.log(res.error.error)
    }
    else {
      window.alert(res.error.error)
      console.log(res.error.error);
    }
    return of(res.error.error)
  }

  logOut() {
    this.isLoggedIn = false;
    this.authToken = ''
    localStorage.removeItem('authToken');
    this.router.navigate(['/login'])
  }

  private autoLogin(): void {
    let authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.isLoggedIn = true
      this.authToken = authToken;
    }

  }

  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin()
  }

  loginUser(user: Partial<Users>): Observable<IAuthResponse<Users>> {
    return this.http.post<IAuthResponse<Users>>(`${this.API_URL}?platform=admin`, user).pipe(catchError(this.getErrorHandler),
      tap((res) => {
        if (res.status === 200 && res.data.user.role === 'ADMIN') {
          this.authToken = res.data.token;
          this.isLoggedIn = true;
          console.log(this.authToken);
          this.saveToken(this.authToken);
          alert('Admin logged in successfully')
          this.router.navigate(['/dashboard']);
        } else if (res.status === 200 && res.data.user.role === 'USER') {
          alert('Only Admins are Authorized to login here')
          this.router.navigate(['/login']);
        }
      }))
  }



  createUser(user: Partial<Users>): Observable<IApiResponse<Users>> {
    return this.http.post<IApiResponse<Users>>(`${this.API_URL}/users?platform=admin`, user).pipe(catchError(this._handleHttpErrors(new Users())),)
  }


}
