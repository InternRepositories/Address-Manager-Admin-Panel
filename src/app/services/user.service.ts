import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/apiResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  // private apiUrl = environment.api.adminBaseUrl + environment.api.usersRoute;
  private apiUrl = environment.api.commonBaseUrl + '/users/';
  private adminUrl = environment.api.adminBaseUrl + '/users/';


  constructor(private http: HttpClient) { }

  getAll(): Observable<IApiResponse<{ users: User[] }>> {
    return this.http.get<IApiResponse<{ users: User[] }>>(this.adminUrl + '?platform=admin');
  }

  getOne(id: string): Observable<IApiResponse<{ user: User }>> {
    return this.http.get<IApiResponse<{ user: User }>>(this.apiUrl + id + '?platform=admin');
  }

  createOne(userData: Partial<User>): Observable<IApiResponse<{ user: User }>> {
    return this.http.post<IApiResponse<{ user: User }>>(this.apiUrl, userData + '?platform=admin');

  }

  updateOne(id: string, userData: Partial<User>): Observable<IApiResponse<{ user: User }>> {
    return this.http.patch<IApiResponse<{ user: User }>>(this.apiUrl + id + '?platform=admin', userData);
  }

  deleteOne(id: string): Observable<IApiResponse<{ user: User }>> {
    return this.http.delete<IApiResponse<{ user: User }>>(this.apiUrl + id + '?platform=admin');
  }

  getImageBase64(user: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(user, { responseType: 'blob' }).subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      }, (error) => {
        reject(error);
      });
    });
  }
  uploadPic(file: File): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file,);

    // Make http post request over api
    // with formData as req
    return this.http.post("http://localhost:5000/api/v1/common/users?platform=admin", formData)
  }

}
