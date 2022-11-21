import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from "../../modules/user/services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;
  errors: string;
  isAuthorized: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this._createForm();
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    if (this.isAuthorized) {
      this.message = "User logged in.";
    }
  }

  _createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    })
  }

  login(): void {
    const rawValue = this.form.getRawValue();
    if (!rawValue) {
      this.errors = "Error: Token is empty!";
      return;
    }

    // console.log(rawValue);
    this.authService.login(rawValue).subscribe({
      next: (value) => {
        this.authService.setToken(value);
        this.isAuthorized = this.authService.isAuthorized();

        var time = 3;
        var x = setInterval(
          () => {
            this.message = "Login successful! Now proceed to profile page in " + (--time) + " sec...";
            if (time === 0) {
              this.router.navigate(['profile']);
              clearInterval(x);
            }
          },
          1000);
      },
      error: e => {
        // console.log("login ERROR: ", e);
        this.errors = e
        // this.errors = error;
      }
    })

  }
}
