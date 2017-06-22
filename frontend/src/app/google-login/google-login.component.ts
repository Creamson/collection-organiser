import {AfterViewInit, Component} from '@angular/core';
import 'rxjs/add/operator/map';
import {GoogleAuthService} from '../google-auth/google-auth.service';


@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements AfterViewInit {

  constructor(private gAuth: GoogleAuthService) {
  }

  ngAfterViewInit() {
    this.gAuth.attachSignin();
  }

}
