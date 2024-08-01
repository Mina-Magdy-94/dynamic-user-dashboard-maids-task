import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app-state.model';
import { searchUsersById } from '../../../store/users.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchByIdInputValue: string = '';
  id: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setIdFromRoute();
    });

    this.setIdFromRoute();
  }

  private setIdFromRoute() {
    let currentRoute = this.activatedRoute.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    this.id = currentRoute.snapshot.paramMap.get('id');
    console.log('current route ID:', this.id);
  }

  backToUsersList() {
    this.router.navigate(['users']);
  }

  onInputAllowNumbersOnly(e: Event) {
    const input = e.target as HTMLInputElement;
    const inputValue = input.value;
    const filteredValue = inputValue.replace(/[^0-9]/g, '');

    this.searchByIdInputValue = filteredValue;
    input.value = this.searchByIdInputValue;

    this.store.dispatch(searchUsersById({ searchValue: this.searchByIdInputValue }));
  }
}
