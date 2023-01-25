import {Component, Input, OnInit} from '@angular/core';
import {IAge} from "../../interfaces";

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {
  @Input()
  age: IAge

  constructor() { }

  ngOnInit(): void {
  }

}
