import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from "./components/users/users.component";
import {MyGuardGuard} from "./guards";


const routes: Routes = [
  // {
  //   path: '', component: UsersComponent,
  // },
  // {path: ':id', component: MovieDetailsComponent, resolve: {data: MovieResolveService}}
  {
    path: '', component: UsersComponent, canActivate: [MyGuardGuard], canDeactivate: [MyGuardGuard],
    children: [
      // {path: ':id', component: UserDetailsComponent, resolve: {data: UserResolveService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
