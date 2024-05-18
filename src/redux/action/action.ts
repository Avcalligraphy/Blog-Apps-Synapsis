
import { Action } from "redux";

export enum UserActionTypes {
  ADD_USER = "ADD_USER",
}

interface AddUserAction extends Action {
  type: UserActionTypes.ADD_USER;
  payload: {
    name: string;
    gender: string;
    email: string;
    status: string;
  };
}

export type UserAction = AddUserAction;

export const addUser = (userData: {
  name: string;
  gender: string;
  email: string;
  status: string;
}): AddUserAction => ({
  type: UserActionTypes.ADD_USER,
  payload: userData,
});
