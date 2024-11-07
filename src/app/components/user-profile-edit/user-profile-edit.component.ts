import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomUploaderComponent } from "./custom-uploader/custom-uploader.component";
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../user-page/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AppUrlEnum } from '../../core/const/route-enums';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CustomUploaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile-edit.component.html',
})
export class UserProfileEditComponent implements OnInit {
  messageService = inject(MessageService)
  edit:boolean = false
  userId = ""
  userService = inject(UserService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  ngOnInit(): void {
    this.initialiseForm()
    this.route.paramMap.pipe(switchMap(route=>{
        const id = route.get("id")
        if (id) {
          this.userId = id
          return this.userService.getUser(id)
        }
        return of(null)
    })).subscribe({next:(val)=>{
      val?this.edit = true:this.edit = false
      val?this.initialiseForm(val):this.initialiseForm()}})
  }
  customUploaderReset = signal<any>(false);
  userUpdateForm!: FormGroup;
  initialiseForm(userData:IUser = {
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    profilePicture:""
  }) {
    this.userUpdateForm = new FormGroup({
      firstName: new FormControl(userData.firstName, 
        Validators.required,
      ),
      lastName: new FormControl(userData.lastName, 
        Validators.required,
      ),
      email: new FormControl(userData.email, [Validators.required,Validators.email]),
      phoneNumber: new FormControl(userData.phoneNumber, ),
      customUploader: new FormControl(
        {
          value: userData.profilePicture,
          disabled: false,
        },
      ),
     
    });
  }
 
  onSubmit() {
    if (!this.userUpdateForm.valid) return
    const formValue = this.userUpdateForm.value
    const userdata = {firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber || '',
      profilePicture:  formValue.customUploader ||""
    }
    
    this.edit?this.userService.updateUser(this.userId,userdata).subscribe({
      next:()=>{
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: "user Succesfully edited" ,life: 1000 });
      }
    }):this.userService.addUserData(userdata).subscribe(
      {
        next:()=>{
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: "user Succesfully added" ,life: 1000 });
    }}
    )
    this.customUploaderReset.set(true);
    this.userUpdateForm.reset();
    this.router.navigate([AppUrlEnum.USER])
  }
}
