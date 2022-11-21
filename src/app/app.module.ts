import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ActivateComponent} from './components/activate/activate.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthComponent} from './components/auth/auth.component';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from './components/header/header.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from "./components/login/login.component";
import {MainInterceptor} from "./main.interceptor";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {PagenotfoundComponent} from './components/pagenotfound/pagenotfound.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RefreshComponent} from "./components/refresh/refresh.component";
import {RegisterComponent} from "./components/register/register.component";


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    RefreshComponent,
    PagenotfoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
