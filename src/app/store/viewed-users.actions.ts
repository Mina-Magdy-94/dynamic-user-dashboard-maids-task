import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUser = createAction(
  '[Viewed Users] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[Viewed Users] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Viewed Users] Load User Failure',
  props<{ error: string }>()
);
