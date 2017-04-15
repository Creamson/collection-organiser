import { Component, OnInit } from '@angular/core';
import {JwtHelper} from "angular2-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private id_token: string;
  private decodedJwt: string;

  constructor() {
    this.id_token = localStorage.getItem('id_token');
    console.log(this.id_token);
    // this.decodedJwt = this.id_token && window.jwt_decode(this.id_token);
    const jwtHelper = new JwtHelper();
    this.decodedJwt = jwtHelper.decodeToken(this.id_token);
    console.log(this.decodedJwt);
  }

  ngOnInit() {
  }

}
