import {Injectable} from '@angular/core';
import {CLIENT_ID} from '../../assets/client-info';
import {Router} from '@angular/router';

declare const gapi: any;

@Injectable()
export class GoogleAuthService {

  private clientId: string;

  public auth2: any;

  public init() {
    const that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin'
      });
    });
  }

  private waitTillAuthInitialized(funToExecute, retries = 10) {
    const that = this;
    if (this.auth2 == null) {
      setTimeout(function () {
        if (retries > 0) {
          that.waitTillAuthInitialized(funToExecute, retries - 1);
        } else {
          console.log('Failed to execute function - initialization took too long.');
        }
      }, 100);
    } else {
      funToExecute();
    }
  }

  public attachSignin(element) {
    const that = this;
    const attachFun = function () {
      that.auth2.attachClickHandler(element, {},
        function (googleUser) {

          // const profile = googleUser.getBasicProfile();
          const id_token: string = googleUser.getAuthResponse().id_token;

          localStorage.setItem('id_token', id_token);
          that.router.navigate(['home']);
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
    };
    this.waitTillAuthInitialized(attachFun);
  }

  public googleSignOut() {
    const that = this;
    const signoutFun = function() {
      that.auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      localStorage.removeItem('id_token');
      that.router.navigate(['']);
    };
    this.waitTillAuthInitialized(signoutFun);
  }

  constructor(private router: Router) {
    this.clientId = CLIENT_ID;
    this.init();
  }


}
