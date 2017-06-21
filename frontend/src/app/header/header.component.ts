import { Component, OnInit } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {GoogleAuthService} from 'app/google-auth/google-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private decodedJwt: any;

  constructor(public gAuth: GoogleAuthService) { }

  ngOnInit() {
    const id_token = localStorage.getItem('id_token');
    const jwtHelper = new JwtHelper();
    this.decodedJwt = jwtHelper.decodeToken(id_token);
  }

  public getUser() {
    return this.decodedJwt.email;
  }

  public googleSignOut() {
    this.gAuth.googleSignOut();
  }

}
