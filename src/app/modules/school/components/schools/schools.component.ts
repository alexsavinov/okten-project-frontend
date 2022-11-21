import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISchool} from "../../interfaces";
import {DataService, SchoolService} from "../../services";


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  message: string;
  errors: string;
  isAuthorized: boolean;

  schools: ISchool[];

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.schoolService.getAll().subscribe(
      value => {
        this.schools = value.data;
        // console.log(value.data);
      },
      error => {
        this.errors = error;
      });
  }

}
