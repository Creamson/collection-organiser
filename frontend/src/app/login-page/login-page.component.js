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
var router_1 = require("@angular/router");
var constants_1 = require("assets/constants");
var http_1 = require("@angular/http");
var LoginPageComponent = (function () {
    function LoginPageComponent(router, http) {
        this.router = router;
        this.http = http;
        this.urlInput = 'greeting';
        this.response = 'nothing received yet';
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        if (angular2_jwt_1.tokenNotExpired('id_token')) {
            this.router.navigate(['home']);
        }
    };
    LoginPageComponent.prototype.sendSampleRequest = function (service) {
        var _this = this;
        var url = constants_1.apiPath + service;
        this.http.get(url).subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = 'error: ' + error.text(); });
    };
    return LoginPageComponent;
}());
LoginPageComponent = __decorate([
    core_1.Component({
        selector: 'app-login-page',
        templateUrl: './login-page.component.html',
        styleUrls: ['./login-page.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], LoginPageComponent);
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=login-page.component.js.map