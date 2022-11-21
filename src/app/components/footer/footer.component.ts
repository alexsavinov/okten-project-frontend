import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {DataService} from "../../modules/user/services";
import * as pkg from 'package.json';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  message: string;
  errors: string;
  isAuthorized: boolean;

  version: string;
  email: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    let {version} = pkg;
    this.version = version;

    // let bSubject = new BehaviorSubject("a");
    //
    // bSubject.next("b");
    //
    // bSubject.subscribe(value => {
    //   console.log("Subscription got", value);
    // });

    this.dataService.storage.subscribe(value => {
        this.email = value.email
        console.log('readFromStorage', value);
      },
      error => {
        this.errors = error;
      });
  }

}
