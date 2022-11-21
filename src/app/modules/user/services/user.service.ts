import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../../../../constants";
import {IProfile, IServerResponseUsers, IUser} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IServerResponseUsers> {
    return this.httpClient.get<IServerResponseUsers>(urls.users);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<IUser>(`${urls.users}/${id}`);
  }

  update(profile: any): Observable<any> {
    return this.httpClient.patch<IProfile>(`${urls.users}/update`, {profile}
    );
  }

  deleteById(id: number | undefined): Observable<any> {
    return this.httpClient.delete<IUser>(`${urls.users}/${id}/delete`);
  }

  avatarAdd(avatar: any): Observable<any> {
    return this.httpClient.patch<IUser>(`${urls.users}/avatar`, avatar);
  }
}
