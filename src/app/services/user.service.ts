import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { IAddress } from '../interfaces/address.interface';
import { ErrorHandlerService } from './error-handler.service';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentRoute = '/users/';
  private apiUrl = environment.api.adminUrl + this.currentRoute;
  private commonUsersUrl = environment.api.commonUrl + this.currentRoute;
  private urlQueries = '?platform=admin&role=USER';
  private platform = { platform: 'admin' };

  private adminUrl = environment.api.adminBaseUrl + this.currentRoute;

  constructor(
    private http: HttpClient,
    private _errorHandlerService: ErrorHandlerService
  ) {}

  parseAddressUrl = (id: string) =>
    `${environment.api.webUrl}${this.currentRoute}${id}/addresses?platform=admn`;

  getAddressesByUserId(id: string): Observable<IApiResponse<IAddress[]>> {
    return this.http.get<IApiResponse<IAddress[]>>(this.parseAddressUrl(id));
  }

  getAll(
    queryParams: {
      limit: number;
      page: number;
      role?: UserRole;
    } = { limit: 10, page: 1, role: UserRole.USER }
  ): Observable<
    IApiResponse<{ limit: number; page: number; count: number; users: User[] }>
  > {
    const params = new URLSearchParams([
      ['platform', 'ADMIN'],
      ['role', queryParams.role ?? 'USER'],
      ['limit', queryParams.limit.toString()],
      ['page', queryParams.page.toString()],
    ]).toString();

    return this.http
      .get<
        IApiResponse<{
          limit: number;
          page: number;
          count: number;
          users: User[];
        }>
      >(`${this.apiUrl}?${params}`)
      .pipe(
        catchError(this._errorHandlerService.handleError),
        tap((resp: any) => {
          console.log(resp);
        })
      );
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
