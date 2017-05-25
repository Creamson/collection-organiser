"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var client_info_1 = require("../../assets/client-info");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var google_auth_service_1 = require("../google-auth/google-auth.service");
var GoogleLoginComponent = (function () {
    function GoogleLoginComponent(element, router, http, gAuth) {
        this.element = element;
        this.router = router;
        this.http = http;
        this.gAuth = gAuth;
        this.clientId = client_info_1.CLIENT_ID;
    }
    GoogleLoginComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        this.gAuth.attachSignin(this.element.nativeElement.firstChild);
    };
    GoogleLoginComponent.prototype.getTokenValidityReponse = function (token) {
        return this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token)
            .map(function (res) { return res.json(); })
            .subscribe(function (output) { return console.log(output); });
    };
    return GoogleLoginComponent;
}());
GoogleLoginComponent = __decorate([
    core_1.Component({
        selector: 'google-login',
        templateUrl: './google-login.component.html',
        styleUrls: ['./google-login.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, router_1.Router, http_1.Http, google_auth_service_1.GoogleAuthService])
], GoogleLoginComponent);
exports.GoogleLoginComponent = GoogleLoginComponent;
//# sourceMappingURL=google-login.component.js.map