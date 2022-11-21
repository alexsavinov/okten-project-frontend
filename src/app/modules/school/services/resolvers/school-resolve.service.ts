import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {delay, Observable} from 'rxjs';

import {ISchool} from "../../interfaces";
import {SchoolService} from "../../services";


@Injectable({
  providedIn: 'root'
})
export class SchoolResolveService implements Resolve<ISchool> {

  constructor(private schoolService: SchoolService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchool> | Promise<ISchool> | ISchool {
    const {id} = route.params;
    // return this.schoolService.getById(id).pipe(delay(1000)); // demo delay
    return this.schoolService.getById(id);
  }
}
