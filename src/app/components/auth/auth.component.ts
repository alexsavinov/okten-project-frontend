import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

import {AuthService} from "../../modules/user/services/auth.service";
import {UserService} from "../../modules/user/services";
import {IUser} from "../../modules/user/interfaces";
import {UserComponent} from "../../modules/user/components/user/user.component";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  access: string;
  refresh: string;
  user: IUser | undefined;
  errors: string;
  message: string;
  isAuthorized: boolean;

  closeResult = '';

  constructor(
    // private modalService: NgbModal,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized();
    this.access = localStorage.getItem("access") || "";
    this.refresh = localStorage.getItem("refresh") || "";
    // console.log("localStorage.getItem(user) = " + localStorage.getItem("user"));
    // let user = localStorage.getItem("user");
    // if (user != null) {
    //   this.user = JSON.parse(user);
    // }
    // this.user = JSON.parse(localStorage.getItem("") || "") || undefined;

    // if (this.authService.isAuthorized()) {
    //   console.log("Authorizated!");
    //
    //   // this.router.navigate(['/'])
    // }
  }

  _createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    })
  }

  login(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.deleteToken();
    this.isAuthorized = this.authService.isAuthorized();

    this.user = undefined;
    this.access = "";
    this.refresh = "";
  }


  open(content: any) {
    // this.modalService.open(
    //   content,
    //   {
    //     ariaLabelledBy: 'modal-basic-title'
    //     // , modalDialogClass: 'dark-modal', windowClass: 'dark-modal'
    //   }
    // ).result.then(() => {
    //   this.login();
    //   // this.closeResult = `Closed with: ${result}`;
    //   // }, (reason) => {
    //   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // }).catch(e => {
    //   // console.log('e=' + e);
    // });
  }

  private getDismissReason(reason: any, content: any = null): string {
    // console.log("getDismissReason -- content:")
    // if (reason === ModalDismissReasons.ESC) {
    //   console.log('by pressing ESC');
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   console.log('by clicking on a backdrop');
    //   return 'by clicking on a backdrop';
    // } else {
    //
    //   console.log(`with: ${reason}`);
    //   return `with: ${reason}`;
    // }
    return "";
  }

  register() {
    this.router.navigate(['register']);
  }

  activate() {
    this.router.navigate(['activate']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

  refreshAction() {
    this.router.navigate(['refresh']);
  }
}
