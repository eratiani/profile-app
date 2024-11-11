import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CustomUploaderComponent } from './custom-uploader/custom-uploader.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../user-page/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AppUrlEnum } from '../../core/const/route-enums';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AppInterface } from '../../store/app.interface';
import { Store } from '@ngrx/store';
import {
  addUser,
  fetchUser,
  resteUser,
  updateUser,
} from '../../store/app.action';
import { selectSelectedUser } from '../../store/app.selectors';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CustomUploaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile-edit.component.html',
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private store = inject(Store<AppInterface>);
  messageService = inject(MessageService);
  edit: boolean = false;
  userId = '';
  userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  ngOnInit(): void {
    this.initialiseForm();
    this.route.paramMap
      .pipe(
        tap((route) => {
          const id = route.get('id');
          if (id) {
            this.userId = id;

            this.store.dispatch(fetchUser({ userId: id }));
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.store
      .select(selectSelectedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.edit = true;
          this.initialiseForm(user);
        } else {
          this.edit = false;
          this.initialiseForm();
        }
      });
  }
  customUploaderReset = signal<any>(false);
  userUpdateForm!: FormGroup;
  initialiseForm(
    userData: IUser = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      profilePicture: '',
    }
  ) {
    this.userUpdateForm = new FormGroup({
      firstName: new FormControl(userData.firstName, Validators.required),
      lastName: new FormControl(userData.lastName, Validators.required),
      email: new FormControl(userData.email, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(userData.phoneNumber),
      customUploader: new FormControl({
        value: userData.profilePicture,
        disabled: false,
      }),
    });
  }

  onSubmit() {
    if (!this.userUpdateForm.valid) return;
    const formValue = this.userUpdateForm.value;
    const userdata = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber || '',
      profilePicture: formValue.customUploader || '',
    };
    this.edit
      ? this.userService
          .updateUser(this.userId, userdata)
          .pipe(
            tap((user) =>
              this.store.dispatch(
                updateUser({ userId: this.userId, user: user })
              )
            ),
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: () => {
              this.messageService.clear();
              this.messageService.add({
                severity: 'success',
                summary: 'SUCCESS',
                detail: 'user Succesfully edited',
                life: 1000,
              });
              this.router.navigate([AppUrlEnum.USER]);
            },
          })
      : this.userService
          .addUserData(userdata)
          .pipe(
            tap((user) => this.store.dispatch(addUser({ user }))),
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: () => {
              this.messageService.clear();
              this.messageService.add({
                severity: 'success',
                summary: 'SUCCESS',
                detail: 'user Succesfully added',
                life: 1000,
              });
              this.router.navigate([AppUrlEnum.USER]);
            },
          });
    this.customUploaderReset.set(true);
    this.userUpdateForm.reset();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.store.dispatch(resteUser());
  }
}
