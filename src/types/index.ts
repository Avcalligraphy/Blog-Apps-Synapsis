export interface CreateUserFormData {
  name: string;
  gender: string;
  email: string;
  status: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
export interface UserAction {
  type: string;
  payload?: any;
}
export interface UserState {
  user: User | null;
  error: string | null;
}
