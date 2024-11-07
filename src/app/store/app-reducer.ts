import { createReducer, on } from '@ngrx/store';
import { AppInterface } from './app.interface';
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from './app.action';

export const initState: AppInterface = {
  auth: {user:{password:"",userName:""},isLoggedIn:false,error:null},
  Users: [],
  items:0
};

export const appReducer = createReducer(
    initState,
    
    on(login, (state) => ({
      ...state,
      auth: { ...state.auth, error: null }
    })),
    
    on(loginSuccess, (state, { user }) => ({
      ...state,
      auth: {
        user,
        isLoggedIn: true,
        error: null
      }
    })),
    
    on(loginFailure, (state, { error }) => ({
      ...state,
      auth: {
        ...state.auth,
        user: null,
        isLoggedIn: false,
        error
      }
    })),
    
    on(register, (state) => ({
      ...state,
      auth: { ...state.auth, error: null }
    })),
    
    on(registerSuccess, (state, { user }) => ({
      ...state,
      auth: {
        ...state.auth,
        user,
        isLoggedIn: true,
        error: null
      }
    })),
    
    on(registerFailure, (state, { error }) => ({
      ...state,
      auth: {
        ...state.auth,
        user: null,
        isLoggedIn: false,
        error
      }
    }))
  );