import { Component, OnInit } from '@angular/core';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, authHttp: AuthHttp) { }

  ngOnInit() {
    if (tokenNotExpired('id_token')) {
      this.router.navigate(['home']);
    }
  }

  public sendSampleRequest() {
    // authHttp.
  }

}
