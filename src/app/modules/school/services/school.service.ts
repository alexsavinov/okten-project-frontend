import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";

import {urls} from "../../../../constants";
import {IServerResponseSchools, ISchool, ICity} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IServerResponseSchools> {
    // console.log("urls.Schools=" + urls.Schools);
    return this.httpClient.get<IServerResponseSchools>(urls.schools);
  }

  getById(id: string): Observable<ISchool>{
    return this.httpClient.get<ISchool>(`${urls.schools}/${id}`);
  }

  update(school: any): Observable<any> {
    return this.httpClient.patch<ISchool>(`${urls.schools}/update`, school
    );
  }

  deleteById(id: number | undefined): Observable<any> {
    return this.httpClient.delete<ISchool>(`${urls.schools}/${id}/delete`);
  }

  logoAdd(logo: any): Observable<any> {
    return this.httpClient.patch<ISchool>(`${urls.schools}/logo`, logo);
  }

  getAllCities(): Observable<any> {
    return this.httpClient.get<ICity[]>(`${urls.schools}/city?size=1000`);
  }

}
