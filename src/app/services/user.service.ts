import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  private apiUrl = environment.api.commonBaseUrl + environment.api.usersRoute;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IApiResponse<{ users: User[] }>> {
    return this.http.get<IApiResponse<{ users: User[] }>>(this.apiUrl);
  }

  getOne(id: string): Observable<IApiResponse<{ user: User }>> {
    return this.http.get<IApiResponse<{ user: User }>>(this.apiUrl + id);
  }

  createOne(userData: Partial<User>): Observable<IApiResponse<{ user: User }>> {
    return this.http.post<IApiResponse<{ user: User }>>(this.apiUrl, userData);
  }

  updateOne(
    id: string,
    userData: Partial<User>
  ): Observable<IApiResponse<{ user: User }>> {
    return this.http.patch<IApiResponse<{ user: User }>>(
      this.apiUrl + id,
      userData
    );
  }

  deleteOne(id: string): Observable<IApiResponse<{ user: User }>> {
    return this.http.delete<IApiResponse<{ user: User }>>(this.apiUrl + id);
  }
}
