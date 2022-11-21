import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from "../../modules/user/services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  userNameError: string;
  message: string;
  errors: string;
  isAuthorized: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    // }, [this._checkPasswords])
    })
  }

  register(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.errors = "";

    const rawValue = this.form.getRawValue();
    rawValue.profile = {
      // "name": "",
      // "surname": "",
      // "born": "",
      // "phone": ""
      // "name": "user1",
      // "surname": "surname1",
      // "born": "1990-01-01",
      // "phone": "+380505556677"
    };
    delete rawValue.confirmPassword;
    this.authService.register(rawValue).subscribe({
        next: () => {
          this.message = "Register email sent to you. Confirm registration by link in message."
          // this.router.navigate(['login'])
        },
        error: e => {
          // console.log("register: ", e)
          // console.log(e.message)

          try {
            var arr = JSON.parse(e.message);
            for (var prop in arr) {
              if (Object.prototype.hasOwnProperty.call(arr, prop)) {
                this.errors = this.errors + prop + ": " + arr[prop] + "\n";
                // console.log(prop, arr[prop])
              }
            }
          } catch (err) {
            this.errors = e.message;
          }

        }
      }
    )

  }

  _checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')
    return password?.value === confirmPassword?.value ? null : {notSame: true}
  }
}
