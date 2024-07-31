import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import { selectAllUsers } from './store/users.selectors';
import { loadUsers } from './store/users.actions';
import { AppState } from './models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.isLoading$ = this.store.select(state => state.user.isLoading);
    this.error$ = this.store.select(state => state.user.error);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ page: 1 }));
  }

  getSecondPage(page: number) {
    this.store.dispatch(loadUsers({ page }));
  }
}
