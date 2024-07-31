import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService, ApiResponse } from '../services/user.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }


  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action => {
        const paginationFromStorage = JSON.parse(localStorage.getItem('pagination') || '[]');
        const cachedPage = paginationFromStorage.find((pageObj: any) => pageObj.page === action.page);

        if (cachedPage) {
          return of(loadUsersSuccess({
            users: cachedPage.data,
            pagination: cachedPage
          }));
        } else {
          return this.userService.getUsers(action.page).pipe(
            map((response: ApiResponse) => {
              const { data, page, per_page, total, total_pages } = response;
              const newPagination = [...paginationFromStorage, response];
              localStorage.setItem('pagination', JSON.stringify(newPagination));
              return loadUsersSuccess({
                users: data,
                pagination: { page, per_page, total, total_pages }
              });
            }),
            catchError(error => of(loadUsersFailure({ error })))
          );
        }
      })
    )
  );
}


