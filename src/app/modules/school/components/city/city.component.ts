import {Component, Input, OnInit} from '@angular/core';
import {ICity} from "../../interfaces";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input()
  city: ICity
  @Input()
  select: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
