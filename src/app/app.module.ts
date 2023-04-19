import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamFormComponent } from './components/team/team-form/team-form.component';
import { TeamListComponent } from './components/team/team-list/team-list.component';
import { TeamViewComponent } from './components/team/team-view/team-view.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountFormComponent } from './components/account/account-form/account-form.component';
import { AccountViewComponent } from './components/account/account-view/account-view.component';
import { AccountListComponent } from './components/account/account-list/account-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    UserListComponent,
    UserViewComponent,
    TeamsComponent,
    TeamFormComponent,
    TeamListComponent,
    TeamViewComponent,
    AccountComponent,
    AccountFormComponent,
    AccountViewComponent,
    AccountListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
