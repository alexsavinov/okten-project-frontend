import {ActivatedRoute} from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
// import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

import {ICity, ISchool} from "../../interfaces";
import {SchoolService} from "../../services";
import {AuthService} from "../../../user/services/auth.service";


@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit {

  message: string;
  errors: string;
  isAuthorized: boolean;
  form: FormGroup;

  school: ISchool;
  logo: any;
  logoFile: any;

  // cities: ICity[];

  constructor(private activatedRoute: ActivatedRoute,
              private schoolService: SchoolService,
              private authService: AuthService,
              // config: NgbModalConfig,
              // private modalService: NgbModal
  ) {

    // config.backdrop = 'static';
    // config.keyboard = false;
    // config.size = "xl";
    // config.scrollable = true;
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    this.message = "";

    // console.log('school-details ngOnInit')
    this.activatedRoute.params.subscribe(({id}) => {
      console.log('id', id);

      this.schoolService.getById(id).subscribe(
        value => {
          console.log(value);

          this.school = value;
          this.logo = this.school.logo;

          this._createForm(this.school);
        },
        error => {
          this.errors = error;
        });
    });
  }

  _createForm(school: ISchool): void {
    this.form = new FormGroup({
      name: new FormControl(school.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      about: new FormControl(school.about),
      homework: new FormControl(school.homework),
      certificate: new FormControl(school.certificate),
      internship: new FormControl(school.internship),
      site: new FormControl(school.site),
      facebook: new FormControl(school.facebook),
      instagram: new FormControl(school.instagram),
      telegram: new FormControl(school.telegram),
      tiktok: new FormControl(school.tiktok),
      youtube: new FormControl(school.youtube),
      logo: new FormControl(null),
    })
  }

  submit(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.errors, this.message = "";

    const rawValue = this.form.getRawValue();
    if (!rawValue) {
      this.errors = "Error: Token is empty!";
      return;
    }

    // console.log(rawValue);
    // console.log(this.school);

    this.school = {...this.school, ...rawValue};
    // @ts-ignore
    // delete this.school['logo'];

    // console.log(this.school);


    // update school
    this.schoolService.update(this.school).subscribe(
      value => {
        console.log('school value:', value);
        this.message = this.message + "School data was successfully updated! ";

        // update logo
        if (rawValue.logo) {
          const formData = new FormData();
          formData.append('id', '' + this.school.id);
          formData.append('logo', this.logoFile);
          this.schoolService.logoAdd(formData).subscribe(
            value => {
              console.log('Logo value:', value)
              this.message = this.message + "Logo was uploaded to " + value.logo;
            },
            error => {
              // console.log(error)
              this.errors = this.errors + " " + error.toString();
            });
        }
      },
      error => {
        this.errors = this.errors + " " + error.toString();
        // console.log(error);
      }
    );

  }


  getFile(e: any): void {
    if (!e.target.files || !e.target.files.length) {
      return;
    }

    if (e.target.files[0].size / 1024 / 1024 > 20) {
      this.message = this.message + "File size should be less than 20MB. ";
      return;
    }

    let nam = e.target.files[0].name.split('.').pop();
    if (nam != "png" && nam != "jpeg" && nam != "jpg") {
      this.message = this.message + "Please upload graphic image file. ";
      return;
    }

    this.message = "";

    const [file] = e.target.files;
    this.logoFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.logo = reader.result
    }
  }

  open(content: any, event: Event): void {
    event.preventDefault();
    // this.modalService.open(content);
  }


  catchCityEmmit(cityCatch: ICity[]): void {
    console.log('catchUserEmit', cityCatch);
    if (cityCatch) {
      this.school.cities = cityCatch;
    }
    // this.userEmitter.emit(userCatch);
    // this.users = this.users.filter(i => i.id != userCatch.id);
    // this.modalService.dismissAll();
  }
}
