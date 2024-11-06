import { createAction, props } from "@ngrx/store";
import { userDTO } from "../shared/services/user.interface";

export const login = createAction('[Auth] Login', props<{ credentials: userDTO }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: userDTO }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const register = createAction('[Auth] registration', props<{ credentials: userDTO }>());
export const registerSuccess = createAction('[Auth] registration Success', props<{ user: userDTO }>());
export const registerFailure = createAction('[Auth] registration Failure', props<{ error: string }>());