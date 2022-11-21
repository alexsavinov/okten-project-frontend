import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {IUser} from "../../interfaces";
import {DataService, UserService} from "../../services";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // // starRating = 0;
  // currentPage = 1;
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  // selected = 0;
  // hovered = 0;
  // readonly = false;
  // constructor() { }
  //
  // ngOnInit(): void {
  // }

  message: string;
  errors: string;
  isAuthorized: boolean;

  users: IUser[];

  @Output()
  userEmitter = new EventEmitter<IUser>();

  constructor(private userService: UserService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      value => {
        this.users = value.data
      },
      error => {
        this.errors = error;
      });
  }

  catchUserEmit(userCatch: IUser): void {
    // console.log('catchUserEmit', userCatch);
    this.userEmitter.emit(userCatch);
    this.users = this.users.filter(i => i.id != userCatch.id);
  }

  readFromStorage() {
    // console.log('readFromStorage running..')
    this.dataService.storage.subscribe(value => {
        // console.log('readFromStorage', value);
      },
      error => {
        this.errors = error;
      });
  }


}
