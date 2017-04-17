import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {CLIENT_ID} from '../../assets/client-info';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GoogleAuthService} from '../google-auth/google-auth.service';


@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements AfterViewInit {

  private clientId: string;
  constructor(private element: ElementRef, private router: Router, private http: Http, private gAuth: GoogleAuthService) {
    this.clientId = CLIENT_ID;
  }

  ngAfterViewInit() {
    const that = this;
    this.gAuth.attachSignin(this.element.nativeElement.firstChild);
  }


  getTokenValidityReponse(token: string) {
    return this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token)
      .map(res => res.json())
      .subscribe(output => console.log(output));
  }

}
