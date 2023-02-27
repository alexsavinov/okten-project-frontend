import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {faUser, faSignIn, faSignOut} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from "../../modules/user/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  faSignIn = faSignIn;
  faSignOut = faSignOut;
  isAuthorized: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
  }

  logout() {
    this.authService.deleteToken();
    this.isAuthorized = this.authService.isAuthorized();
    this.router.navigate(['login']);
    // this.user = undefined;
    // this.access = "";
    // this.refresh = "";
  }
}
