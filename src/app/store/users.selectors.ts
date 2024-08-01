import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(selectUserState, (state: UserState) => state.allUsers);
export const selectUsersToShow = createSelector(selectUserState, (state: UserState) => state.usersListToShow);
export const selectCurrentPagination = createSelector(selectUserState, (state: UserState) => state.currentPagination);
export const selectPaginationList = createSelector(selectUserState, (state: UserState) => state.paginationList);



