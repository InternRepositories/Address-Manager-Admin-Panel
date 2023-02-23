import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../../app/models/addressModel'
import { IApiResponse } from '../interfaces/api-response'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = environment.api.adminBaseUrl + environment.api.addressRoute;

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal, error: err.error });
    };
  }
  constructor(private http: HttpClient) { }

  getAllAddresses(): Observable<IApiResponse<Address[]>> {
    return this.http.get<IApiResponse<Address[]>>(`${this.API_URL}?platform=admin`).pipe(catchError(this._handleHttpErrors([])));
  }

  getAddressById(_id: string): Observable<IApiResponse<Address>> {
    return this.http.get<IApiResponse<Address>>(`${this.API_URL}/${_id}?platform=admin`).pipe(catchError(this._handleHttpErrors(new Address())));
  }

  createAddress(address: Partial<Address>): Observable<IApiResponse<Address>> {
    return this.http.post<IApiResponse<Address>>(`${this.API_URL}/?platform=admin`, address).pipe(catchError(this._handleHttpErrors(new Address())));
  }

  updateAddress(_id: string, address: Address): Observable<IApiResponse<Address>> {
    return this.http.patch<IApiResponse<Address>>(`${this.API_URL}/${_id}?platform=admin`, address).pipe(catchError(this._handleHttpErrors(new Address())));
  }

  deleteAddress(_id: string): Observable<IApiResponse<Address>> {
    return this.http.delete<IApiResponse<Address>>(`${this.API_URL}/${_id}?platform=admin`).pipe(catchError(this._handleHttpErrors(new Address())));
  }




}
