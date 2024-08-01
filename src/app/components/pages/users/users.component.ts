import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/models/app-state.model';
import { PaginationInfo } from 'src/app/models/pagination.model';
import { User } from 'src/app/models/user.model';
import { loadUsers } from 'src/app/store/users.actions';
import { selectAllUsers, selectCurrentPagination, selectUsersToShow, selectPaginationList } from 'src/app/store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers$: Observable<User[][]>;
  usersToShow$: Observable<User[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  paginationList$!: Observable<PaginationInfo[] | null>
  currentPagination$!: Observable<PaginationInfo | null | undefined>



  constructor(private store: Store<AppState>) {
    this.usersToShow$ = this.store.select(selectUsersToShow);
    this.allUsers$ = this.store.select(selectAllUsers);
    this.isLoading$ = this.store.select(state => state.user.isLoading);
    this.error$ = this.store.select(state => state.user.error);
    this.paginationList$ = this.store.select(selectPaginationList);
    this.currentPagination$ = this.store.select(selectCurrentPagination);
    // this.paginationSubscription = this.store.select(paginationState).subscribe((state) => {
    //   this.pagination$ = state
    // });

  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ pageNumber: 1 }));
    // this.paginationService.assignPaginationData()
  }






  // getSecondPage(page: number) {
  //   this.store.dispatch(loadUsers({ page }));
  // }
}
