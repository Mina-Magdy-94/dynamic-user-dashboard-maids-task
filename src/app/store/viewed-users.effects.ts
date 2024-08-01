import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { loadUser, loadUserSuccess, loadUserFailure } from './viewed-users.actions';
import { AppState } from '../models/app-state.model';
import { ViewedUsersState } from './viewed-users.reducer';

@Injectable()
export class ViewedUsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      withLatestFrom(this.store.select(state => state.viewedUsers)),
      mergeMap(([action, viewedUsersState]: [{ id: number }, ViewedUsersState]) => {
        const { id } = action;
        const cachedUser = viewedUsersState.allViewedUsers.find(user => user.id === +id);
        console.log(cachedUser)
        if (cachedUser) {
          return of(loadUserSuccess({ user: cachedUser }));
        } else {
          return this.userService.getUserById(`${id}`).pipe(
            map(response => loadUserSuccess({ user: response.data })),
            catchError(error => of(loadUserFailure({ error: error.message })))
          );
        }
      })
    )
  );
}
