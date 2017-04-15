import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {CLIENT_ID} from '../../assets/client-info';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

declare const gapi: any;

@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements AfterViewInit {

  private clientId: string;


  public auth2: any;
  public googleInit() {
    const that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin'
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    const that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

          // const profile = googleUser.getBasicProfile();
          const id_token: string = googleUser.getAuthResponse().id_token;

          localStorage.setItem('id_token', id_token);
          that.router.navigate(['home']);
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef, private router: Router, private http: Http) {
    this.clientId = CLIENT_ID;
  }

  ngAfterViewInit() {
    this.googleInit();
  }


  getTokenValidityReponse(token: string) {
    return this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token)
      .map(res => res.json())
      .subscribe(output => console.log(output));
  }

}
