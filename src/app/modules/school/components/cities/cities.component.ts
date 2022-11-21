import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICity} from "../../interfaces";
import {DataService, SchoolService} from "../../services";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../user/services/auth.service";
import {IUser} from "../../../user/interfaces";
import {pipe} from "rxjs";


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  message: string;
  errors: string;
  isAuthorized: boolean;
  form: FormGroup;

  cities: ICity[];

  @Input()
  cities_selected: ICity[] | undefined;

  @Output()
  cityEmitter = new EventEmitter<ICity[]>();

  constructor(
    private schoolService: SchoolService,
    private authService: AuthService) {

    // citi
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    this.message, this.errors = "";
    this.create_form();

    this.schoolService.getAllCities().subscribe(
      value => {
        this.cities = value.data;
        // console.log(this.cities_selected);
        this.create_form();
        // console.log(value.data);
      },
      error => {
        this.errors = error.toString();
      });
  }

  onSubmit(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.errors, this.message = "";

    const rawValue = this.form.getRawValue();

    if (this.cities_selected === undefined)
      this.cities_selected = [];
    this.cities_selected = this.cities?.filter(v => rawValue[v.id as number])

    this.cityEmitter.emit(this.cities_selected);

  }

  create_form(): void {
    this.form = new FormGroup({});

    this.cities?.forEach((city) => {
        this.form.addControl(
          '' + city.id,
          new FormControl(this.cities_selected?.some(e => e.id === city.id))
        );
      }
    );
  }

  toggle(city: ICity) {
    if (this.selected(city)) {
      this.cities_selected = this.cities_selected?.filter(item => item.id !== city.id);
    } else {
      if (this.cities_selected === undefined)
        this.cities_selected = [];
      this.cities_selected.push(city);
    }
  }

  selected(city: ICity): boolean {
    // console.log('selected')
    return this.cities_selected?.some(v => v.id === city.id) as boolean;
  }
}
