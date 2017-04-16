import { Component, OnInit } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {GoogleAuthService} from '../google-auth/google-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private gAuth: GoogleAuthService) { }

  ngOnInit() {
    if (tokenNotExpired('id_token')) {
      this.router.navigate(['home']);
    }
  }

}
