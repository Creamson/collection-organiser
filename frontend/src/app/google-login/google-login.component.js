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
var GoogleLoginComponent = (function () {
    function GoogleLoginComponent(element) {
        this.element = element;
        this.scope = [
            'profile',
            'email'
        ].join(' ');
        console.log('ElementRef: ', this.element);
        this.clientId = client_info_1.CLIENT_ID;
    }
    GoogleLoginComponent.prototype.googleInit = function () {
        var that = this;
        gapi.load('auth2', function () {
            that.auth2 = gapi.auth2.init({
                client_id: that.clientId,
                cookiepolicy: 'single_host_origin',
                scope: that.scope
            });
            that.attachSignin(that.element.nativeElement.firstChild);
        });
    };
    GoogleLoginComponent.prototype.attachSignin = function (element) {
        var that = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            // YOUR CODE HERE
        }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
    };
    GoogleLoginComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    return GoogleLoginComponent;
}());
GoogleLoginComponent = __decorate([
    core_1.Component({
        selector: 'google-login',
        templateUrl: './google-login.component.html',
        styleUrls: ['./google-login.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleLoginComponent);
exports.GoogleLoginComponent = GoogleLoginComponent;
//# sourceMappingURL=google-login.component.js.map