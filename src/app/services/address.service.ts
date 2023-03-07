import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../../app/models/addressModel'
import { IApiResponse } from '../interfaces/apiResponse'
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = environment.api.adminBaseUrl + environment.api.addressRoute;
  private COMMON_URL = environment.api.commonBaseUrl + environment.api.addressRoute;
  private BaseUrl = environment.api.commonBaseUrl
  private AdminUrl = environment.api.adminBaseUrl

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal, error: err.error });
    };
  }

  private _tokenHandler(res: HttpErrorResponse): Observable<IApiResponse> {
    if (res.error.error === 'jwt expired') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Token as Expired',
      })

      localStorage.removeItem('authToken');
      setTimeout(() => {
        location.href = "/dashboard";
      }, 5000)
    }
    return of(res.error.error)

  }
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  getAllAddresses(page = 1, limit = 10): Observable<IApiResponse<Address[]>> {
    return this.http.get<IApiResponse<Address[]>>(`${this.API_URL}?platform=admin&page=${page}&limit=${limit}`).pipe(catchError(this._tokenHandler));
  }

  getAddressById(_id: string): Observable<IApiResponse<Address>> {
    return this.http.get<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}?platform=admin`).pipe(catchError(this._tokenHandler));
  }

  createAddress(address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.post<IApiResponse<Address>>(`${this.COMMON_URL}?platform=admin`, address).pipe(catchError(this._tokenHandler));
  }

  updateAddress(_id: any, address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.put<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}?platform=admin`, address).pipe(catchError(this._tokenHandler));
  }

  changeStatus(_id: any, address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.patch<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}?platform=admin`, address).pipe(catchError(this._tokenHandler));
  }

  deleteAddress(_id: string): Observable<IApiResponse<Address>> {
    return this.http.delete<IApiResponse<Address>>(`${this.COMMON_URL}/${_id}/destroy?platform=admin`).pipe(catchError(this._tokenHandler));
  }

  filterAddresses(formData: Partial<Address>, page = 1, limit = 10): Observable<IApiResponse<Address[]>> {
    return this.http.get<IApiResponse<Address[]>>(`${this.API_URL}?platform=admin&page=${page}&limit=${limit}&status=${formData.status}&address_1=${formData.address_1}&city=${formData.city}&parish=${formData.parish}=${formData}`).pipe(catchError(this._tokenHandler));
  }

  getAllStatus(): Observable<IApiResponse<Address[]>> {
    return this.http.get<IApiResponse<Address[]>>(`${this.BaseUrl}/getRoleAndStatus?platform=admin`).pipe(catchError(this._tokenHandler));
  }
  getLimitedUsers(page = 1, limit = 10000): Observable<IApiResponse<User[]>> {
    return this.http.get<IApiResponse<User[]>>(`${this.AdminUrl}/users?platform=admin&page=${page}&limit=${limit}`).pipe(catchError(this._tokenHandler));
  }








}
