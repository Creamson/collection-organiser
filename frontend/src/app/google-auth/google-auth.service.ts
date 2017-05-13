import {Injectable} from '@angular/core';
import {CLIENT_ID} from '../../assets/client-info';
import {Router} from '@angular/router';

declare const gapi: any;
const url = 'https://apis.google.com/js/platform.js?onload=__onGoogleLoaded';

@Injectable()
export class GoogleAuthService {

  private clientId: string;

  public auth2: any;

  private loadAPIPromise: Promise<any>;

  public initAuth2() {
    const that = this;
    this.loadAPIPromise = new Promise((resolve) => {
      window['__onGoogleLoaded'] = () => {
        gapi.load('auth2', () => {
          that.auth2 = gapi.auth2.init({
            client_id: that.clientId,
            cookiepolicy: 'single_host_origin'
          });
          resolve();
        });
      };
      this.loadGapiScript();
    });
  }

  public attachSignin(element) {
    const that = this;
    this.loadAPIPromise.then( () => {
      that.auth2.attachClickHandler(element, {},
        function (googleUser) {
          // const profile = googleUser.getBasicProfile();
          const id_token: string = googleUser.getAuthResponse().id_token;

          localStorage.setItem('id_token', id_token);
          that.router.navigate(['home']);
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
    });
  }

  public googleSignOut() {
    const that = this;
    this.loadAPIPromise.then(() => {
      that.auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      localStorage.removeItem('id_token');
      that.router.navigate(['']);
    });
  }

  constructor(private router: Router) {
    this.clientId = CLIENT_ID;

    this.initAuth2();
  }

  private loadGapiScript() {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);

  }


}
