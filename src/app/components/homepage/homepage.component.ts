import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {
        interval: 3000,
        noPause: false,
        showIndicators: true
      }
    }
  ],
})
export class HomepageComponent implements OnInit {
  slides = [
    {image: 'assets/logo.png', text: 'First'},
    // {image: 'assets/swagger.png', text: 'Second'},
    // {image: 'assets/django.png', text: 'Third'}
  ];
  noWrapSlides = false;
  showIndicator = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
