import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { IAddress } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentRoute = '/users/';
  private apiUrl = environment.api.adminUrl + this.currentRoute;
  private commonUsersUrl = environment.api.commonUrl + this.currentRoute;
  private urlQueries = '?platform=admin&role=USER';

  users: User[] = [];

  private adminUrl = environment.api.adminBaseUrl + '/users/';


  constructor(private http: HttpClient) { }

  parseAddressUrl = (id: string) =>
    `${environment.api.webUrl}/users/${id}/addresses?platform=admn`;

  getAddressesByUserId(id: string): Observable<IApiResponse<IAddress[]>> {
    return this.http.get<IApiResponse<IAddress[]>>(this.parseAddressUrl(id));
  }

  getAll(): Observable<
    IApiResponse<{ limit: number; page: number; users: User[] }>
  > {
    return this.http.get<
      IApiResponse<{ limit: number; page: number; users: User[] }>
    >(this.apiUrl + this.urlQueries);
  }

  getOne(id: string): Observable<IApiResponse<User>> {
    return this.http.get<IApiResponse<User>>(
      this.commonUsersUrl + id + this.urlQueries
    );
  }

  createOne(userData: any): Observable<IApiResponse<User>> {
    return this.http.post<IApiResponse<User>>(
      this.commonUsersUrl + this.urlQueries,
      userData
    );
  }

  updateOne(id: string, userData: any): Observable<IApiResponse<User>> {
    return this.http.patch<IApiResponse<User>>(
      this.commonUsersUrl + id + this.urlQueries,
      userData
    );
  }

  deleteOne(id: string): Observable<IApiResponse<User>> {
    return this.http.delete<IApiResponse<User>>(
      this.commonUsersUrl + id + this.urlQueries
    );
  }
}
