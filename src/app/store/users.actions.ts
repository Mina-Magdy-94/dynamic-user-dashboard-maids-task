import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { PaginationInfo } from '../models/pagination.model';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ pageNumber: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[], pagination: PaginationInfo }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

export const searchUsersById = createAction(
  '[User] Search Users By Id',
  props<{ searchValue: string }>()
);
