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
var google_auth_service_1 = require("app/google-auth/google-auth.service");
var HeaderComponent = (function () {
    function HeaderComponent(gAuth) {
        this.gAuth = gAuth;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var id_token = localStorage.getItem('id_token');
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        this.decodedJwt = jwtHelper.decodeToken(id_token);
    };
    HeaderComponent.prototype.getUser = function () {
        return this.decodedJwt.email;
    };
    HeaderComponent.prototype.googleSignOut = function () {
        this.gAuth.googleSignOut();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    }),
    __metadata("design:paramtypes", [google_auth_service_1.GoogleAuthService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map