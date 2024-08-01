import { createReducer, on } from '@ngrx/store';
import { searchUsersById, loadUsers, loadUsersSuccess, loadUsersFailure } from './users.actions';
import { User } from '../models/user.model';
import { PaginationInfo } from '../models/pagination.model';

export interface UserState {
  allUsers: User[][];
  usersListToShow: User[];
  paginationList: PaginationInfo[];
  currentPagination: PaginationInfo | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: UserState = {
  allUsers: [],
  usersListToShow: [],
  paginationList: [],
  currentPagination: null,
  error: null,
  isLoading: false,
};


export const userReducer = createReducer(
  initialState,
  on(searchUsersById, (state, { searchValue }) => {
    const filteredUsers = state.allUsers.flat().filter(user =>
      user.id.toString().includes(searchValue)
    );

    if (filteredUsers.length > 0) {
      return {
        ...state,
        usersListToShow: filteredUsers,
        error: null
      };
    } else {
      return {
        ...state,
        error: `No User with this id ${searchValue} exists`,
        usersListToShow: []
      };
    }
  }),
  on(loadUsers, (state) => ({ ...state, isLoading: true, error: null })),
  on(loadUsersSuccess, (state, { users, pagination }) => {
    let allUsers = [...state.allUsers]
    let updatedPaginationList = [...state.paginationList]

    const isPageFound = state.allUsers.some(usersOfCertainPage =>
      usersOfCertainPage.some(user => user.id === users[0].id && user.first_name === users[0].first_name)
    );

    if (!isPageFound) {
      allUsers = [...state.allUsers, users]
      updatedPaginationList = [...state.paginationList, pagination]
    }

    return {
      ...state,
      allUsers,
      usersListToShow: users,
      paginationList: updatedPaginationList,
      currentPagination: pagination,
      isLoading: false,
      error: null,
    };
  }),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
