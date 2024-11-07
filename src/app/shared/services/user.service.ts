import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { userDTO } from './user.interface';
import { IUser } from '../../components/user-page/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() { }
  addUserData(userDTO: IUser) {
    return  this.http.post<IUser>(`${this.API}/userData`, userDTO)
  }
  getUserData():Observable<IUser[] |[]>  {
    // const params = new HttpParams()
    //   .set('userName', userDto.firstName + " " + userDto.lastName)
    //   .set('email', userDto.email)
    //   .set('phoneNumber', userDto.phoneNumber||"")
    //   .set('profilePicture', userDto.profilePicture || "");
    return this.http.get<IUser[]>(`${this.API}/userData`);
  }
}