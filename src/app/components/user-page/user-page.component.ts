import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import {
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { fetchUsers } from '../../store/app.action';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    PhoneFormatPipe,
    RouterLink,
    DialogModule,
  ],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  users$!: Observable<IUser[]>;
  messageService = inject(MessageService);
  store = inject(Store<AppInterface>);
  userService = inject(UserService);
  display = false;
  constructor() {}

  onReject() {
    this.display = false;
  }

  onDeleteUser(arg0: string) {
    this.userService
      .deleteUser(arg0)
      .pipe(
        tap(() => this.store.dispatch(fetchUsers())),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'SUCCESS',
            detail: 'user deleted',
            life: 1000,
          });
        },
      });
    this.display = false;
  }

  onShowModal(ev: Event) {
    ev.stopImmediatePropagation();
    this.display = true;
  }
  ngOnInit() {
    // this.users$ = this.userService.getUserData()
    this.store.dispatch(fetchUsers());
    this.users$ = this.store
      .select((state: { app: AppInterface }) => state.app.users)
      .pipe(distinctUntilChanged());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
