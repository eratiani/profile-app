import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppUrlEnum } from '../../core/const/route-enums';
import { AuthService } from '../../shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userDTO } from '../../shared/services/user.interface';
import { Store } from '@ngrx/store';
import { AppInterface } from '../../store/app.interface';
import { login, register } from '../../store/app.action';
import { selectUser } from '../../store/app-selector';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
   apiUrl = AppUrlEnum
  pageRoute!: AppUrlEnum;
  authForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private store = inject(Store<AppInterface>)
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initFOrm()
    this.pageRoute = this.route.snapshot.data['pageRoute'];
    this.store.select(selectUser).subscribe();
  }
  initFOrm() {
    this.authForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onAuthFormSubmit(){
    console.log(this.pageRoute);
    if (!this.authForm.valid) return
    
   (this.pageRoute === this.apiUrl.SIGNIN)?this.onLogIn(this.authForm.value):this.onRegister(this.authForm.value)
  }
  onLogIn(user:userDTO){
    this.store.dispatch(login({ credentials: user}));
  }
  onRegister(user:userDTO){
    this.store.dispatch(register({ credentials: user}))
  }
}
