import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {AuthService} from "../../modules/user/services/auth.service";
import {IToken, IUser} from "../../modules/user/interfaces";
import {UserService} from "../../modules/user/services";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  errors: string;
  message: string;
  user: IUser;
  isAuthorized: boolean;
  avatar: any;
  avatarFile: any;

  constructor(
    private authService: AuthService,
    private userService: UserService) {

    this._createForm();
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    this.message = "";
  }

  _createForm(): void {

    this.userService.getById(this.authService.getUserId()).subscribe(
      value => {
        // console.log('user:', value.data[0])
        this.user = value.data[0];
        this.avatar = this.user.profile.avatar;

        this.form = new FormGroup({
          name: new FormControl(this.user.profile.name),
          surname: new FormControl(this.user.profile.surname),
          phone: new FormControl(this.user.profile.phone),
          born: new FormControl(this.user.profile.born),
          avatar: new FormControl(null),
        })
      },
      error => {
        this.errors = error;
      });
  }

  submit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.errors, this.message = "";

    const rawValue = this.form.getRawValue();
    // console.log("rawValue", rawValue);

    // update profile
    this.userService.update(rawValue).subscribe(
      value => {
        // console.log(value);
        this.message = this.message + "User profile successfully updated! ";

        // update avatar
        if (rawValue.avatar) {
          const formData = new FormData();
          formData.append('avatar', this.avatarFile);
          this.userService.avatarAdd(formData).subscribe(
            value => {
              // console.log('value:', value)
              this.message = this.message + "Avatar was uploaded to " + value.avatar;
            },
            error => {
              // console.log(error)
              this.errors = this.errors + " " + error;
            });
        }
      },
      error => {
        this.errors = this.errors + " " + error.toString();
        // console.log(error);
      }
    );


  }

  getFile(e: any) {
    if (!e.target.files || !e.target.files.length) {
      return;
    }

    if (e.target.files[0].size / 1024 / 1024 > 20) {
      this.message = this.message + "File size should be less than 20MB. ";
      return;
    }

    let nam = e.target.files[0].name.split('.').pop();
    if (nam != "png" && nam != "jpeg") {
      this.message = this.message + "Please upload graphic image file. ";
      return;
    }

    this.message = "";

    const [file] = e.target.files;
    this.avatarFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatar = reader.result
    }

    return;


    // console.log(e.target.files[0]);
    // if (e.target.files[0].size / 1024 / 1024 > 20) {
    //   alert("File size should be less than 20MB")
    //   return;
    // }
    // let extensionAllowed = {"png": true, "jpeg": true};
    // if (extensionAllowed) {
    //   this.user.profile.avatar = e.target.files[0].name;
    //
    //   this.form.patchValue({
    //     avatar: e.target.files[0]
    //   });
    // }
  }
}
