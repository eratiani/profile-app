import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { userDTO } from './user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() {}
  registerUser(userDTO: userDTO) {
    return this.http.post(`${this.API}/users`, userDTO);
  }
  getUser(userDto: userDTO):Observable<userDTO[] |[]>  {
    const params = new HttpParams()
      .set('userName', userDto.userName)
      .set('password', userDto.password);
    return this.http.get<userDTO[]>(`${this.API}/users`, { params });
  }
}
