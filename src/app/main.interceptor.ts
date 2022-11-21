import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, switchMap} from 'rxjs/operators'
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

import {AuthService} from "./modules/user/services/auth.service";
import {IToken} from "./modules/user/interfaces";


@Injectable()
export class MainInterceptor implements HttpInterceptor {
  isRefreshing = false

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log("MainInterceptor:", request);


    const isAuthenticated = this.authService.isAuthorized();

    if (isAuthenticated) {
      request = this.addToken(request, this.authService.getAccessToken())
    }
    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {

        // FIXME 1
        if (res && res.error && res.status === 405) {
          console.log("!!! FIXME 1")
          return throwError(() => new Error('ERROR TOKEN!'));
        }

        // FIXME 2
        if (res && res.error
          && res.status === 400
          && res.error == "Token invalid or expired") {
          console.log("!!! FIXME 2")
          console.log("res400: ", res);

          return throwError(() => new Error(res.error.valueOf()));
        }

        // -- 400 errors
        if (res && res.error && res.status === 400) {
          // console.log("error 400:", res.error);

          // ** "user login" errors
          if (res.error.custom) {
            return throwError(() => new Error(res.error.detail));
          }


          // ** "user registration" errors

          // Email errors
          if (res.error.email && res.error.email.length) {
            return throwError(() => new Error(res.error.email));
          }

          // Password errors
          if (res.error.password && res.error.password.length) {
            // console.log(res.error.password[0])
            return throwError(() => new Error(res.error.password));
          }

          // Profile errors
          if (res.error.profile) {
            // console.log(res.error.password[0])
            return throwError(() => new Error(JSON.stringify(res.error.profile)));
          }

          // ** "avatar" errors
          if (res.error.avatar) {
            return throwError(() => new Error(res.error.avatar));
          }

          // Refresh token errors
          if (res.error.refresh) {
            return throwError(() => new Error(res.error.refresh));
          }

        }


        // -- 401 errors
        if (res && res.error && res.status === 401) {

          // console.log("401 error: ", res)
          return this.handle401Error(request, next);

          // User auth login errors
          if (res.error.detail) {
            // console.log("401 error: ", res)
            // console.log("401 error: ", res.error.detail)
            return throwError(() => new Error(res.error.detail));
          }
        }


        // -- 503 errors
        if (res && res.error && res.status === 503) {
          // Error 11001 connecting to redis:6379. getaddrinfo failed.
          return throwError(() => new Error(res.error));
        }


        this.router.navigate(['/login']);

        // this.authService.deleteToken();

        console.log(res)
        console.log(res.error)

        return throwError(() => new Error('Unhandled error!'));
      })
    ) as any;
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    // console.log("handle401Error -- ");
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      // Redirect to Login page if there is no Refresh token.
      if (this.authService.getRefreshToken() == null) {
        this.router.navigate(['/login']);
        this.isRefreshing = false;
        return;
      }

      return this.authService.refresh().pipe(
        switchMap((tokens: IToken) => {
          return next.handle(this.addToken(request, tokens.access))
        }),
        catchError((error) => {
          console.log("handle401Error -- " + error);
          this.isRefreshing = false;
          this.authService.deleteToken();

          // console.log("2this.router.navigate(['/auth']);")
          this.router.navigate(['/login']);
          // return throwError(() => new Error('token invalid or expired'))
          return throwError(() => new Error('Invalid login or password!'));
        })
      )
    }
  }
}
