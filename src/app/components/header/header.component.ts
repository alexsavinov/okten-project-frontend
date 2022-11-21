import {Component, OnInit} from '@angular/core';

import * as pkg from 'package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  version: string;

  constructor() {
  }

  ngOnInit(): void {
    let {version} = pkg;
    this.version = version;
  }

}
