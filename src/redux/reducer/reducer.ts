
import { UserAction, UserActionTypes } from "../action/action";


export interface UserState {
  users: {
    name: string;
    gender: string;
    email: string;
    status: string;
  }[];
}

const initialState: UserState = {
  users: [],
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
