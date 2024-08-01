import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { loadUser } from 'src/app/store/viewed-users.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  // user: User | undefined
  // error: string | undefined
  // isLoading: boolean = false
  user$: Observable<User | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,) {
    this.user$ = this.store.select(state => state.viewedUsers.userToView);
    this.isLoading$ = this.store.select(state => state.viewedUsers.isLoading);
    this.error$ = this.store.select(state => state.viewedUsers.error);
  }

  ngOnInit(): void {

    this.getUserDetails()
  }

  getUserDetails() {
    const { id } = this.activatedRoute.snapshot.params
    console.log(this.activatedRoute.snapshot)

    this.store.dispatch(loadUser({ id }));
    // this.isLoading = true
    // this.userService.getUserById(id).subscribe({
    //   next: (response) => {
    //     this.user = response.data
    //     this.error = undefined
    //     this.isLoading = false
    //   },
    //   error: (err) => {
    //     this.user = undefined
    //     this.error = "Error Please try again"
    //     this.isLoading = false
    //     this.showErrorSnackBar('Error fetching data');
    //   },
    // })
  }

  showErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar']
    });
  }

  onClickBackToUsersList() {
    this.router.navigate(['/users'])
  }



}
