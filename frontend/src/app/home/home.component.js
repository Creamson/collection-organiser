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
var angular2_jwt_1 = require("angular2-jwt");
var google_auth_service_1 = require("../google-auth/google-auth.service");
var constants_1 = require("../../assets/constants");
var HomeComponent = (function () {
    function HomeComponent(gAuth, authHttp) {
        this.gAuth = gAuth;
        this.authHttp = authHttp;
        this.urlInput = 'collections';
        this.requestBody = '{"name": "Movies"}';
        this.id_token = localStorage.getItem('id_token');
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        this.decodedJwt = jwtHelper.decodeToken(this.id_token);
        this.response = 'nothing received yet';
    }
    HomeComponent.prototype.googleSignOut = function () {
        this.gAuth.googleSignOut();
    };
    HomeComponent.prototype.sendSampleRequest = function (service) {
        var _this = this;
        var url = constants_1.apiPath + service;
        this.authHttp.post(url, this.requestBody).subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = 'error: ' + error.text(); });
    };
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [google_auth_service_1.GoogleAuthService, angular2_jwt_1.AuthHttp])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map