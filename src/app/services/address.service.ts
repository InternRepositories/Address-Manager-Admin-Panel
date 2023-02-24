import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../../app/models/addressModel'
import { IApiResponse } from '../interfaces/apiResponse'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = environment.api.adminBaseUrl + environment.api.addressRoute;
  private COMMON_URL = environment.api.commonBaseUrl + environment.api.addressRoute;

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal, error: err.error });
    };
  }

  private _tokenHandler(res: HttpErrorResponse): Observable<IApiResponse> {
    if (res.error.error === 'jwt expired') {
      window.alert('Your session has expired')
      this.router.navigate(['/login']);
      localStorage.removeItem('authToken');
    }
    return of(res.error)

  }
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  getAllAddresses(): Observable<IApiResponse<Address[]>> {
    return this.http.get<IApiResponse<Address[]>>(`${this.API_URL}?platform=admin`).pipe(catchError(this._tokenHandler));
  }

  getAddressById(_id: string): Observable<IApiResponse<Address>> {
    return this.http.get<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}?platform=admin`).pipe(catchError(this._tokenHandler));
  }

  createAddress(address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.post<IApiResponse<Address>>(`${this.API_URL}/?platform=admin`, address).pipe(catchError(this._tokenHandler));
  }

  updateAddress(_id: any, address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.patch<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}?platform=admin`, address).pipe(catchError(this._tokenHandler));
  }

  deleteAddress(_id: string): Observable<IApiResponse<Address>> {
    return this.http.delete<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}/destroy?platform=admin`).pipe(catchError(this._tokenHandler));
  }






}
