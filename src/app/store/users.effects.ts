import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './users.actions';
import { AppState } from '../models/app-state.model';
import { UserState } from './users.reducer';
import { selectUserState } from './users.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectUserState)),
      mergeMap(([action, userState]: [{ pageNumber: number }, UserState]) => {
        const { pageNumber } = action;
        const cachedPage = userState.paginationList.find(p => p.page === pageNumber);

        if (cachedPage) {
          const index = userState.paginationList.indexOf(cachedPage);
          const usersToShow = userState.allUsers[index];
          return of(loadUsersSuccess({ users: usersToShow, pagination: cachedPage }));
        } else {
          return this.userService.getUsers(pageNumber).pipe(
            map(response => {
              const { data, page, per_page, total, total_pages } = response;
              const pagination = { page, per_page, total, total_pages };
              return loadUsersSuccess({ users: data, pagination });
            }),
            catchError(error => of(loadUsersFailure({ error: error.message })))
          );
        }
      })
    )
  );
}
