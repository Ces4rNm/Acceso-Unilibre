import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputEmail: string = "";
  inputPass: string = "";

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  login() {
    if (this.inputEmail && this.inputEmail != '' && this.inputPass && this.inputPass != '') {
      console.log(this.inputEmail, this.inputPass);
      this._router.navigate(['home']);
    }
  }
}
