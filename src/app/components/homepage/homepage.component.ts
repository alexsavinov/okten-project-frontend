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
        interval: 10000,
        noPause: false,
        showIndicators: true,
        pauseOnFocus: true,
        isAnimated: true
      }
    }
  ],
})
export class HomepageComponent implements OnInit {
  slides = [
    {image: 'assets/news_title.jpg', text: 'I am a creative, patient, and licensed high school English teacher. ' +
        'I have excellent communication skills\n' +
        'and novel approaches to creating lesson plans. I have a 90% satisfaction rate from both students and\n' +
        'peers. I look forward to applying my skills and to contributing to high-quality secondary education at\n' +
        'your school.'},
    {image: 'assets/news_title.jpg', text: 'I am a creative, patient, and licensed high school English teacher. ' +
        'I have excellent communication skills\n' +
        'and novel approaches to creating lesson plans. I have a 90% satisfaction rate from both students and\n' +
        'peers. I look forward to applying my skills and to contributing to high-quality secondary education at\n' +
        'your school.'},
    {image: 'assets/news_title.jpg', text: 'I am a creative, patient, and licensed high school English teacher. ' +
        'I have excellent communication skills\n' +
        'and novel approaches to creating lesson plans. I have a 90% satisfaction rate from both students and\n' +
        'peers. I look forward to applying my skills and to contributing to high-quality secondary education at\n' +
        'your school.'},
    {image: 'assets/news_title.jpg', text: 'I am a creative, patient, and licensed high school English teacher. ' +
        'I have excellent communication skills\n' +
        'and novel approaches to creating lesson plans. I have a 90% satisfaction rate from both students and\n' +
        'peers. I look forward to applying my skills and to contributing to high-quality secondary education at\n' +
        'your school.'},
    {image: 'assets/news_title.jpg', text: 'I am a creative, patient, and licensed high school English teacher. ' +
        'I have excellent communication skills\n' +
        'and novel approaches to creating lesson plans. I have a 90% satisfaction rate from both students and\n' +
        'peers. I look forward to applying my skills and to contributing to high-quality secondary education at\n' +
        'your school.'},
    // {image: 'assets/news_title.jpg', text: 'Second'},
    // {image: 'assets/news_title.jpg', text: 'Third'}
  ];
  noWrapSlides = false;
  showIndicator = true;

  schools = [
    {image: 'assets/school-1.png', name: 'GoITeens'},
    {image: 'assets/school-2.png', name: 'Logika'},
    {image: 'assets/school-3.png', name: 'Академія професій Майбутнього'},
    {image: 'assets/school-4.png', name: 'ІТ Академія'},
    {image: 'assets/school-5.png', name: 'Robocode'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
