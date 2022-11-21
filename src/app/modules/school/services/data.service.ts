import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {ISchool} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  storage = new BehaviorSubject<ISchool>({} as ISchool);

  constructor() {
  }


}
