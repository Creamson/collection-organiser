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

  constructor() {
  }

  ngOnInit() {
  }

}
