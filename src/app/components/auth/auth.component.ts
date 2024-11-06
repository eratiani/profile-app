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
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initFOrm()
    this.pageRoute = this.route.snapshot.data['pageRoute'];
  }
  initFOrm() {
    this.authForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onAuthFormSubmit(){
    if (!this.authForm.valid)return
   (this.pageRoute === this.apiUrl.SIGNIN)?this.authService.getUser(this.authForm.value):this.authService.registerUser(this.authForm.value)
  }
}
