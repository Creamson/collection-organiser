import { Component, OnInit } from '@angular/core';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {GoogleAuthService} from '../google-auth/google-auth.service';
import {apiPath} from '../../assets/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private id_token: string;
  private decodedJwt: string;
  private response: string;
  public urlInput = 'collections';
  public requestBody = '{"name": "Movies"}';

  constructor(public gAuth: GoogleAuthService, public authHttp: AuthHttp) {
    this.id_token = localStorage.getItem('id_token');
    const jwtHelper = new JwtHelper();
    this.decodedJwt = jwtHelper.decodeToken(this.id_token);
    this.response = 'nothing received yet';
  }

  public googleSignOut() {
    this.gAuth.googleSignOut();
  }

  public sendGetRequest(service: string) {
    const url = apiPath + service;

    this.authHttp.get(url, this.requestBody).subscribe(
      response => this.response = response.text(),
      error => this.response = 'error: ' + error.text()
    );
  }

  public sendPostRequest(service: string) {
    const url = apiPath + service;

    this.authHttp.post(url, this.requestBody).subscribe(
      response => this.response = response.text(),
      error => this.response = 'error: ' + error.text()
    );
  }

  public sendPutRequest(service: string) {
    const url = apiPath + service;

    this.authHttp.put(url, this.requestBody).subscribe(
      response => this.response = response.text(),
      error => this.response = 'error: ' + error.text()
    );
  }

  public sendDeleteRequest(service: string) {
    const url = apiPath + service;

    this.authHttp.delete(url, this.requestBody).subscribe(
      response => this.response = response.text(),
      error => this.response = 'error: ' + error.text()
    );
  }

  ngOnInit() {
  }

}
