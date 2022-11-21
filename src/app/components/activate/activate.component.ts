import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {AuthService} from "../../modules/user/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IToken} from "../../modules/user/interfaces";


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  form: FormGroup;
  errors: string;
  activateToken: IToken;
  message: string;
  isAuthorized: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this._createForm();
  }

  _createForm(): void {
    this.form = new FormGroup({
      activateToken: new FormControl(null)
    })
    this.isAuthorized = this.authService.isAuthorized();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.activateToken = params['activateToken'] as IToken;
      if (this.activateToken) {
        this._activate(this.activateToken);
      }
    })

  }

  activate(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const rawValue = this.form.getRawValue();
    // console.log("rawValue", rawValue);
    // this.access = rawValue.get('access');
    this.activateToken = rawValue.activateToken as IToken;
    if (this.activateToken) {
      this._activate(this.activateToken);
    } else {
      this.errors = "Error: Token is empty!";
    }
  }

  _activate(token: IToken): void {
    if (!token) return;

    this.authService.activate(token).subscribe(
      result => {
        this.message = "Token acitvated! Now proceed to login page...";

        setTimeout(
          () => this.router.navigate(['/login']),
          3000);
      },
      error => {
        this.errors = error;
        // console.log(error);
      });
  }

}
