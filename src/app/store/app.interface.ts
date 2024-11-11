import { IUser } from '../components/user-page/user.interface';
import { userDTO } from '../shared/services/user.interface';

export interface AppInterface {
  auth: AuthState;
  users: IUser[];
  items: number;
  selectedUser:IUser |null
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
