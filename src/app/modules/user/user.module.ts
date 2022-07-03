import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
