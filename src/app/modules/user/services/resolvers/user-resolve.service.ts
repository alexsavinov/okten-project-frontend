import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {delay, Observable} from 'rxjs';

import {IUser} from "../../interfaces";
import {UserService} from "../../services";


@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<IUser> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    const {id} = route.params;
    // return this.userService.getById(id).pipe(delay(1000)); // demo delay
    return this.userService.getById(id);
  }
}
