import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/apiResponse';
import { IParish } from '../interfaces/parish.interface'

@Injectable({
  providedIn: 'root'
})
export class ParishService {
  private API_URL = environment.api.commonBaseUrl + environment.api.parishRoute;
  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal, error: err.error });
    };
  }

  constructor(private http: HttpClient) {

  }

  getAllParishes(): Observable<IApiResponse<IParish[]>> {
    return this.http.get<IApiResponse<IParish[]>>(`${this.API_URL}?platform=admin`).pipe(catchError(this._handleHttpErrors([])));
  }

}
