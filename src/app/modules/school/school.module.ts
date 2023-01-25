import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AgeComponent} from '../course/components/age/age.component';
import {CitiesComponent} from "./components/cities/cities.component";
import {CityComponent} from './components/city/city.component';
import {MainInterceptor} from "../../main.interceptor";
import {SchoolRoutingModule} from './school-routing.module';
import {SchoolComponent} from './components/school/school.component';
import {SchoolsComponent} from './components/schools/schools.component';
import {SchoolDetailsComponent} from './components/school-details/school-details.component';
import {SchoolResolveService, SchoolService} from "../school/services";
import {LearnFormatComponent} from "../course/components/learn_format/learn_format.component";
import {CommentsComponent} from './components/comments/comments.component';
import {CommentComponent} from './components/comment/comment.component';


@NgModule({
  declarations: [
    SchoolComponent,
    SchoolsComponent,
    SchoolDetailsComponent,
    CityComponent,
    CitiesComponent,
    AgeComponent,
    LearnFormatComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SchoolService,
    SchoolResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }
  ],
})
export class SchoolModule {
}
