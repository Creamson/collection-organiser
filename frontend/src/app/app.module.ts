import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import {AppComponent} from './app.component';

import {GoogleLoginComponent} from './google-login/google-login.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {routes} from './app.routes';
import {AuthGuard} from './guards/auth.guard';
import {GoogleAuthService} from './google-auth/google-auth.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {ItemService} from './item.service';
import {CategoryComponent} from './category/category.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    globalHeaders: [{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Accept': 'application/json'
    }]
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginComponent,
    HomeComponent,
    LoginPageComponent,
    CategoryComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [AuthGuard, GoogleAuthService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
