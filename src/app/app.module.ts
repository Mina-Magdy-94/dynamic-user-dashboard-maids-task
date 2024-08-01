import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/users.reducer';
import { UserEffects } from './store/users.effects';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/pages/users/users.component';
import { UserDetailsComponent } from './components/pages/user-details/user-details.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { NavbarComponent } from './components/UI/navbar/navbar.component';
import { UserCardComponent } from './components/pages/users/user-card/user-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginatorComponent } from './components/UI/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScaleOnHoverDirective } from './directives/scale-on-hover.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule } from '@angular/forms';
import { UserDetailsCardComponent } from './components/pages/user-details/user-details-card/user-details-card.component';
import { viewedUsersReducer } from './store/viewed-users.reducer';
import { ViewedUsersEffects } from './store/viewed-users.effects';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    NotFoundComponent,
    NavbarComponent,
    UserCardComponent,
    PaginatorComponent,
    ScaleOnHoverDirective,
    UserDetailsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      user: userReducer,
      viewedUsers: viewedUsersReducer
    }),
    EffectsModule.forRoot([UserEffects, ViewedUsersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
