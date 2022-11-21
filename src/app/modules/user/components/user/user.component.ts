import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IUser} from "../../interfaces";
import {DataService, UserService} from "../../services";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: IUser;
  @Output()
  userEmitter = new EventEmitter<IUser>();

  errors: string;
  message: string;
  isAuthorized: boolean;

  constructor(private userService: UserService, private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  emit(user: IUser) {
    this.userEmitter.emit(user);
  }

  saveToStorage() {
    this.dataService.storage.next(this.user);
    console.log(this.user)
  }

  delete(event: MouseEvent) {
    console.log(event)
    this.userService.deleteById(this.user.id).subscribe(
      value => {
        console.log(value)
        this.userEmitter.emit(this.user);
        // this.user = value.data
      },
      error => {
        this.errors = error;
      });

  }
}
