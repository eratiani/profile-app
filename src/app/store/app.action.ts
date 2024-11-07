import { createAction, props } from "@ngrx/store";
import { userDTO } from "../shared/services/user.interface";

export const login = createAction('[auth] Login', props<{ credentials: userDTO }>());
export const loginSuccess = createAction('[auth] Login Success', props<{ user: userDTO }>());
export const loginFailure = createAction('[auth] Login Failure', props<{ error: string }>());
export const register = createAction('[auth] registration', props<{ credentials: userDTO }>());
export const registerSuccess = createAction('[auth] registration Success', props<{ user: userDTO }>());
export const registerFailure = createAction('[auth] registration Failure', props<{ error: string }>());