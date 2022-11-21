import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from '@angular/common';
import {NgbCarouselModule, NgbPaginationModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

import {UserComponent} from './components/user/user.component';
import {UsersComponent} from './components/users/users.component';
import {UserRoutingModule} from './user-routing.module';
import {UserResolveService, UserService} from "./services";
import {MainInterceptor} from "../../main.interceptor";

// import {StarRatingModule} from "angular-star-rating";


@NgModule({
  declarations: [
    UserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbRatingModule,
    NgbPaginationModule,
    NgbCarouselModule,
    HttpClientModule
    // StarRatingModule
  ],
  providers: [
    UserService,
    UserResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }
  ],
})
export class UserModule {
}
