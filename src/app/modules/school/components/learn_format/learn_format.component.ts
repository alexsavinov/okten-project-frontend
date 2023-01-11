import {Component, Input, OnInit} from '@angular/core';
import {ILearnFormat} from "../../interfaces";

@Component({
  selector: 'app-learn_format',
  templateUrl: './learn_format.component.html',
  styleUrls: ['./learn_format.component.scss']
})
export class LearnFormatComponent implements OnInit {
  @Input()
  learnFormat: ILearnFormat

  constructor() {
  }

  ngOnInit(): void {
  }

}
