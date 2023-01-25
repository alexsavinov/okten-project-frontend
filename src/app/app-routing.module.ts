import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivateComponent} from "./components/activate/activate.component";
import {AuthComponent} from "./components/auth/auth.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserComponent} from "./modules/user/components/user/user.component";
import {LoginComponent} from "./components/login/login.component";
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RefreshComponent} from "./components/refresh/refresh.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      // {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '', component: HomepageComponent},
      {
        path: 'auth', component: AuthComponent, children: [
          {path: '', component: UserComponent}]
      },
      // {
      //   path: 'activate', component: ActivateComponent, children: [
      //     {path: ':activateToken', component: ActivateComponent}]
      // },
      {path: 'auth', component: AuthComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'activate', component: ActivateComponent},
      {path: 'activate/:activateToken', component: ActivateComponent},
      {path: 'refresh', component: RefreshComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'users', loadChildren: () => import('./modules').then(value => value.UserModule)},
      {path: 'schools', loadChildren: () => import('./modules').then(value => value.SchoolModule)},
      {path: 'courses', loadChildren: () => import('./modules').then(value => value.CourseModule)},
    ]
  },
  {path: '**', pathMatch: 'full', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    // useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
