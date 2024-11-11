import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditComponent } from './user-profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState, Store } from '@ngrx/store';
import { AuthEffects } from '../../store/app-effects';
import { appReducer } from '../../store/app-reducer';
import {  provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { fetchUser } from '../../store/app.action';
const storeMock = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(of(null))  
};

const messageServiceMock = jasmine.createSpyObj('MessageService', ['add', 'delete',"edit"]);
describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserProfileEditComponent, 
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MessageService, useValue: messageServiceMock },
        provideRouter(routes),
        provideHttpClient(withFetch()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});