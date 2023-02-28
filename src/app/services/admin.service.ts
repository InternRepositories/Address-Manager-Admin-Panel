import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { FilterService } from '../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  admins: User[] = [];
  private apiUrl = environment.api.adminUrl + '/users/';
  private urlQueries = '?platform=admin&role=ADMIN';
  private commonUsersUrl = environment.api.commonUrl + '/users/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<
    IApiResponse<{ limit: number; page: number; users: User[] }>
  > {
    return this.http
      .get<IApiResponse<{ limit: number; page: number; users: User[] }>>(
        this.apiUrl + this.urlQueries
      )
      .pipe(
        tap(
          (
            resp: IApiResponse<{ limit: number; page: number; users: User[] }>
          ) => {
            console.log('Tapped All Users', resp);
          }
        )
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
      this.apiUrl + id + this.urlQueries
    );
  }
}
