import { createReducer, on } from '@ngrx/store';
import { AppInterface } from './app.interface';
import {
  addUser,
  deleteUser,
  fetchUser,
  fetchUsersFailure,
  fetchUsersSuccess,
  login,
  loginFailure,
  loginSuccess,
  logOut,
  register,
  registerFailure,
  registerSuccess,
  updateUser,
} from './app.action';

export const initState: AppInterface = {
  auth: {
    user: { password: '', userName: '' },
    isLoggedIn: false,
    error: null,
  },
  users: [],
  selectedUser:null,
  items: 0,
};

export const appReducer = createReducer(
  initState,

  on(login, (state) => ({
    ...state,
    auth: { ...state.auth, error: null },
  })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    auth: {
      user,
      isLoggedIn: true,
      error: null,
    },
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    auth: {
      ...state.auth,
      user: null,
      isLoggedIn: false,
      error,
    },
  })),
  ////////////registration
  on(register, (state) => ({
    ...state,
    auth: { ...state.auth, error: null },
  })),

  on(registerSuccess, (state, { user }) => ({
    ...state,
    auth: {
      ...state.auth,
      user,
      isLoggedIn: true,
      error: null,
    },
  })),

  on(registerFailure, (state, { error }) => ({
    ...state,
    auth: {
      ...state.auth,
      user: null,
      isLoggedIn: false,
      error,
    },
  })),

  ///////////////logout
  on(logOut, () => ({
    ...initState,
  })),

  ////////////////user data
  on(fetchUsersSuccess, (state, { userArr }) => ({
    ...state,
    users: userArr,
  })),
  on(fetchUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fetchUser,(state,{userId})=>{
    return {
      ...state,
      selectedUser: state.users.find(user => user.id === userId) || null
    }
  }),
  on(updateUser,(state,{userId,user})=>{
    return {
      ...state,
      users: state.users.map(existingUser =>
        existingUser.id === userId ? { ...existingUser, ...user } : existingUser
      ),
      selectedUser: null
    }
  }),
  on(addUser,(state,{user})=>{
    return {
      ...state,
      users: [...state.users, user] ,
      selectedUser: null 
    };
  }),
  on(deleteUser,(state,{userId})=>{
    return {
      ...state,
      users: [...state.users.filter(user=>user.id!==userId)],
      selectedUser: null 
    };
  })
)

