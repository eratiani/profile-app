import { userDTO } from "../shared/services/user.interface";

export interface AppInterface {
  auth: AuthState;
  Users:UserInterface[],
  items:number
}
export interface AuthState {
  user: userDTO | null;
  isLoggedIn: boolean;
  error: string | null;
}
export interface UserInterface {
  firstName: string;
  lastName: string;
  Email: string;
  phoneNumber?: string;
  profilePicture?: string;
}
