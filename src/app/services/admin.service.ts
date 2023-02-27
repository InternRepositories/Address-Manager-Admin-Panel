import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
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
  private platformQuery = '?platform=admin';
  private createUrl = environment.api.commonUrl + '/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<
    IApiResponse<{ limit: number; page: number; users: User[] }>
  > {
    return this.http
      .get<IApiResponse<{ limit: number; page: number; users: User[] }>>(
        this.apiUrl + this.platformQuery
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
      this.apiUrl + id + this.platformQuery
    );
  }

  createOne(userData: any): Observable<IApiResponse<User>> {
    return this.http.post<IApiResponse<User>>(
      this.createUrl + this.platformQuery,
      userData
    );
  }

  updateOne(
    id: string,
    userData: Partial<User>
  ): Observable<IApiResponse<User>> {
    return this.http.patch<IApiResponse<User>>(
      this.apiUrl + id + this.platformQuery,
      userData
    );
  }

  deleteOne(id: string): Observable<IApiResponse<User>> {
    return this.http.delete<IApiResponse<User>>(
      this.apiUrl + id + this.platformQuery
    );
  }
}
