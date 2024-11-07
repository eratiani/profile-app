import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IUser } from './user.interface';
import { AppInterface } from '../../store/app.interface';
import { Store } from '@ngrx/store';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, PhoneFormatPipe, RouterLink],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
onDeleteUser(arg0: any,ev:Event) {
  ev.stopImmediatePropagation()
  console.log("1111");
}
  users$!: Observable<IUser[]>;
  store = inject(Store<AppInterface>)
  userService = inject(UserService)
  constructor() {}

  ngOnInit() {
    this.users$ = this.userService.getUserData()
  }

  
}