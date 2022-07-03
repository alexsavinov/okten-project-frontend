import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
// import {SearchComponent} from "./components/search/search.component";


const routes: Routes = [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
  // {
  //   path: '', component: MainLayoutComponent, children: [
  //     {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', loadChildren: () => import('./modules').then(value => value.UserModule)},
      // {path: 'genres', loadChildren: () => import('./modules').then(value => value.GenreModule)},
      // {path: 'search', component: SearchComponent}
  //   ]
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
