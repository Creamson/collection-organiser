import { Component, OnInit } from '@angular/core';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';
import {GoogleAuthService} from '../google-auth/google-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private id_token: string;
  private decodedJwt: string;

  constructor(private router: Router, public gAuth: GoogleAuthService, authHttp: AuthHttp) {
    this.id_token = localStorage.getItem('id_token');
    const jwtHelper = new JwtHelper();
    this.decodedJwt = jwtHelper.decodeToken(this.id_token);
    console.log(this.decodedJwt);
  }

  public googleSignOut() {
    this.gAuth.googleSignOut();
  }

  public sendSampleRequest() {
    // authHttp.
  }

  ngOnInit() {
  }

}
