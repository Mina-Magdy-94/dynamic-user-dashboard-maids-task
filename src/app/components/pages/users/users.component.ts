import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/app-state.model';
import { User } from 'src/app/models/user.model';
import { PaginationService } from 'src/app/services/pagination.service';
import { loadUsers } from 'src/app/store/users.actions';
import { selectAllUsers } from 'src/app/store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;



  constructor(private store: Store<AppState>, public paginationService: PaginationService) {
    this.users$ = this.store.select(selectAllUsers);
    this.isLoading$ = this.store.select(state => state.user.isLoading);
    this.error$ = this.store.select(state => state.user.error);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ page: 1 }));
    this.paginationService.assignPaginationData()
  }






  // getSecondPage(page: number) {
  //   this.store.dispatch(loadUsers({ page }));
  // }
}
