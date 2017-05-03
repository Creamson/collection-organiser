import { Component, OnInit } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {apiPath} from 'assets/constants';
import {Http} from '@angular/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private urlInput = 'greeting';
  private response: string;

  constructor(private router: Router, public http: Http) {
    this.response = 'nothing received yet';
  }

  ngOnInit() {
    if (tokenNotExpired('id_token')) {
      this.router.navigate(['home']);
    }
  }


  public sendSampleRequest(service: string) {
    const url = apiPath + service;
    this.http.get(url).subscribe(
      response => this.response = response.text(),
      error => this.response = 'error: ' + error.text()
    );
  }

}
