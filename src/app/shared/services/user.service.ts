import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { userDTO } from './user.interface';
import { IUser } from '../../components/user-page/user.interface';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = environment.apiUrl;
  private http = inject(HttpClient);
  messageService = inject(MessageService)
  constructor() { }
  addUserData(userDTO: IUser) {
    return  this.http.post<IUser>(`${this.API}/userData`, userDTO).pipe(catchError(err=>{
      this.messageService.clear();
      const errorMessage = err.error?.message || err.message || 'An unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 1000
      });
      return throwError(() => err);
    }))
  }
  getUser(id:string):Observable<IUser>{
    return this.http.get<IUser>(`${this.API}/userData/${id}`).pipe(catchError(err=>{
      this.messageService.clear();
      const errorMessage = err.error?.message || err.message || 'An unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 1000
      });
      return throwError(() => err);
    }))
  }
  updateUser(id:string,data:IUser){
    return this.http.patch<IUser[]>(`${this.API}/userData/${id}`,data).pipe(catchError(err=>{
      this.messageService.clear();
      const errorMessage = err.error?.message || err.message || 'An unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 1000
      });
      return throwError(() => err);
    }))
  }
  deleteUser(id:string){
    return this.http.delete(`${this.API}/userData/${id}`).pipe(catchError(err=>{
      this.messageService.clear();
      const errorMessage = err.error?.message || err.message || 'An unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 1000
      });
      return throwError(() => err);
    }))
  }
  getUserData():Observable<IUser[] |[]>  {
    return this.http.get<IUser[]>(`${this.API}/userData`).pipe(catchError(err=>{
      this.messageService.clear();
      const errorMessage = err.error?.message || err.message || 'An unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 1000
      });
      return throwError(() => err);
    }))
  }
}
