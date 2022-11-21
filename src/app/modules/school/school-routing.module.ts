import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SchoolResolveService} from "./services";
import {SchoolsComponent} from "./components/schools/schools.component";
import {SchoolDetailsComponent} from "./components/school-details/school-details.component";


const routes: Routes = [
  {
    path: '', component: SchoolsComponent,
    children: [
      {path: ':id', component: SchoolDetailsComponent, resolve: {data: SchoolResolveService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {
}
