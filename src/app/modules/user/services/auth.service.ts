import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

import {urls} from "../../../../constants";
import {IToken, IUser} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access'
  private refreshTokenKey = 'refresh'
  private id = ''

  constructor(private httpClient: HttpClient) {
  }

  register(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(urls.users, user);
  }

  login(user: IUser): Observable<IToken> {
    return this.httpClient.post<IToken>(urls.auth, user);
  }

  activate(token: IToken) {
    return this.httpClient.get(`${urls.auth}/activate/${token}`);
  }

  refresh(): Observable<IToken> {
    const refresh = this.getRefreshToken();
    // console.log(refresh);
    return this.httpClient.post<IToken>(`${urls.auth}/refresh`, {refresh}).pipe(
      tap((tokens: IToken) => {
        this.setToken(tokens);
      })
    )
  }

  setToken(token: IToken): void {
    localStorage.setItem(this.accessTokenKey, token.access);
    localStorage.setItem(this.refreshTokenKey, token.refresh);
    if (this.id) {
      localStorage.setItem(this.id, token.id?.toString());
    }
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) as string;
  }

  getUserId(): string {
    return localStorage.getItem(this.id) as string;
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    // localStorage.removeItem("user");
    localStorage.removeItem("id");
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

}
