import {Component, OnInit} from '@angular/core';
import {faFacebookF, faInstagram, faTelegram} from '@fortawesome/free-brands-svg-icons';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

// import {faCoffee} from '@fortawesome/';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  faFacebookF = faFacebookF;
  faTelegram = faTelegram;
  faInstagram = faInstagram;

  constructor() {
  }

  ngOnInit(): void {
  }

}
