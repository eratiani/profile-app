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
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, PhoneFormatPipe, RouterLink,DialogModule],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  users$!: Observable<IUser[]>;
  messageService = inject(MessageService)
  store = inject(Store<AppInterface>)
  userService = inject(UserService)
  display = false

onReject() {
  this.display = false
}

onDeleteUser(arg0: string,) {
  this.userService.deleteUser(arg0).subscribe({
    next:()=>{
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: "user deleted" ,life: 1000 });
    }
  })
  this.display = false
}
 
  constructor() {}
  onShowModal(ev:Event) {
    ev.stopImmediatePropagation()
  this.display = true
  }
  ngOnInit() {
    this.users$ = this.userService.getUserData()
  }

  
}