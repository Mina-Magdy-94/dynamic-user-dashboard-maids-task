import { createReducer, on } from '@ngrx/store';
// import * as UserActions from '../actions/user.actions';
import { User } from '../models/user.model';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';



export interface PaginationInfo {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UserState {
  usersListToShow: User[];
  pagination: PaginationInfo[];
  error: string | null;
  isLoading: boolean;
}


export const initialState: UserState = {
  usersListToShow: [],
  pagination: [],
  error: null,
  isLoading: false
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(loadUsersSuccess, (state, { users, pagination }) => ({
    ...state,
    usersListToShow: users,
    pagination: [...state.pagination, pagination],
    isLoading: false
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),

);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
