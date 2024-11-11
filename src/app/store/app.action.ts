import { createAction, props } from '@ngrx/store';
import { userDTO } from '../shared/services/user.interface';
import { IUser } from '../components/user-page/user.interface';

export const login = createAction(
  '[auth] Login',
  props<{ credentials: userDTO }>()
);
export const loginSuccess = createAction(
  '[auth] Login Success',
  props<{ user: userDTO }>()
);
export const loginFailure = createAction(
  '[auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[auth] registration',
  props<{ credentials: userDTO }>()
);
export const registerSuccess = createAction(
  '[auth] registration Success',
  props<{ user: userDTO }>()
);
export const registerFailure = createAction(
  '[auth] registration Failure',
  props<{ error: string }>()
);

export const logOut = createAction('[auth] LogOut');

export const fetchUsers = createAction('[auth] fetchUsers');
export const fetchUsersSuccess = createAction(
  '[auth] fetchUsers Success',
  (userArr: IUser[]) => ({ userArr })
);
export const fetchUsersFailure = createAction(
  '[auth] fetchUsers Failure',
  (error: any) => ({ error })
);


export const fetchUser = createAction('[auth] fetchUser',props<{userId:string}>())
export const updateUser = createAction('[auth] updateUser',props<{userId:string,user:IUser}>())
export const addUser = createAction('[auth] createUser',props<{user:IUser}>())
export const deleteUser = createAction('[auth] deleteUser',props<{userId:string}>())
