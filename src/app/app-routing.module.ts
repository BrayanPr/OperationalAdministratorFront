import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { UsersComponent } from './pages/users/users.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component:UsersComponent },
  { path: 'teams', component:TeamsComponent },
  { path: 'accounts', component:AccountComponent },
  { path: '', component:HomeComponent, canActivate: [AuthGuardGuard] },
  { path: '**', redirectTo: '' } // redirect to not-found page for any other URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] ,
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
