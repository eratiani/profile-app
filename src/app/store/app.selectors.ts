import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppInterface } from "./app.interface";

export const selectAuthState = createFeatureSelector<AppInterface>('app');

export const selectSelectedUser = createSelector(
  selectAuthState,
  (state) => {
    return state?.selectedUser}
);