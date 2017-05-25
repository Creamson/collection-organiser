import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    // Check to see if a user has a valid JWT
    if (tokenNotExpired('id_token')) {
      // If they do, return true and allow the user to load the home component
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
