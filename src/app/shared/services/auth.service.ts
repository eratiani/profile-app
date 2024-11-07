import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { userDTO } from './user.interface';
import { Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() {}
  registerUser(userDTO: userDTO) {
    return this.getUser(userDTO).pipe(switchMap(val=>{
      if (val.length>0) {
        return throwError(() => new Error('User already exists'));
      }
      return  this.http.post<userDTO>(`${this.API}/users`, userDTO);
    }))
  }
  getUser(userDto: userDTO):Observable<userDTO[] |[]>  {
    const params = new HttpParams()
      .set('userName', userDto.userName)
      .set('password', userDto.password);
    return this.http.get<userDTO[]>(`${this.API}/users`, { params });
  }
}
