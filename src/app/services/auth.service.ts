import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/apiResponse'
import { IAuthResponse } from '../interfaces/authResponse'
import { User } from '../interfaces/user.interface';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Users } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.api.commonBaseUrl + environment.api.loginRoute;
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
    console.log(authToken);

    if (authToken) {
      this.isLoggedIn = true
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
    this.autoLogin()
  }

  loginUser(user: Partial<Users>): Observable<IAuthResponse<Users>> {
    return this.http.post<IAuthResponse<Users>>(`${this.API_URL}?platform=admin`, user).pipe(catchError(this.getErrorHandler))
  }


  decodeToken() {
    let authToken: string | null = localStorage.getItem('authToken');
    if (authToken) {
      this.decodeToken = JSON.parse(atob(authToken.split('.')[1]));
    }
    console.log(authToken);

  }



  createUser(user: Partial<Users>): Observable<IAuthResponse<Users>> {
    return this.http.post<IAuthResponse<Users>>(`${this.API_URL}/users?platform=admin`, user).pipe(catchError(this.getErrorHandler))
  }


}
