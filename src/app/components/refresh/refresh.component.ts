import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {AuthService} from "../../modules/user/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IToken} from "../../modules/user/interfaces";
import {catchError, switchMap} from "rxjs/operators";
import {throwError} from "rxjs";


@Component({
  selector: 'app-activate',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {
  form: FormGroup;
  errors: string;
  message: string;
  isAuthorized: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    this._createForm();
  }

  _createForm(): void {
    this.form = new FormGroup({
      refreshToken: new FormControl(this.authService.getRefreshToken()),
      accessToken: new FormControl(this.authService.getAccessToken())
    })
  }

  refresh(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // const rawValue = this.form.getRawValue();
    // console.log("rawValue", rawValue);

    this.authService.refresh().subscribe(
      value => {
        this.message = 'Access token successfully refreshed!';
        this.form.patchValue({
          accessToken: value.access
        });
      },
      error => {
        this.errors = error;
        console.log(error)
      }
    )

  }

}
