import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess, loadUserFailure } from './viewed-users.actions';
import { User } from '../models/user.model';

export interface ViewedUsersState {
  allViewedUsers: User[];
  userToView: User | null;
  error: string | null;
  isLoading: boolean;
}

export const initialViewedUsersState: ViewedUsersState = {
  allViewedUsers: [],
  userToView: null,
  error: null,
  isLoading: false,
};

export const viewedUsersReducer = createReducer(
  initialViewedUsersState,
  on(loadUser, (state) => ({ ...state, isLoading: true, error: null })),
  on(loadUserSuccess, (state, { user }) => {
    const allViewedUsers = [...state.allViewedUsers, user];
    return {
      ...state,
      allViewedUsers,
      userToView: user,
      isLoading: false,
      error: null,
    };
  }),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
