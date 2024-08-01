import { UserState } from "../store/users.reducer";
import { ViewedUsersState } from "../store/viewed-users.reducer";

export interface AppState {
  user: UserState;
  viewedUsers: ViewedUsersState
}
