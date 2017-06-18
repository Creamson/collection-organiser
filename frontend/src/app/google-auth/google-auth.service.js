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
var url = 'https://apis.google.com/js/platform.js?onload=__onGoogleLoaded';
var GoogleAuthService = (function () {
    function GoogleAuthService(router) {
        this.router = router;
        this.clientId = client_info_1.CLIENT_ID;
        this.initAuth2();
    }
    GoogleAuthService.prototype.initAuth2 = function () {
        var _this = this;
        var that = this;
        this.loadAPIPromise = new Promise(function (resolve) {
            window['__onGoogleLoaded'] = function () {
                gapi.load('auth2', function () {
                    that.auth2 = gapi.auth2.init({
                        client_id: that.clientId,
                        cookiepolicy: 'single_host_origin'
                    });
                    resolve();
                });
            };
            _this.loadGapiScript();
        });
    };
    GoogleAuthService.prototype.attachSignin = function () {
        var that = this;
        this.loadAPIPromise.then(function () {
            gapi.signin2.render('ggl-btn-2', {
                'scope': 'profile email',
                'width': 200,
                'height': 40,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': function (googleUser) {
                    var id_token = googleUser.getAuthResponse().id_token;
                    localStorage.setItem('id_token', id_token);
                    that.router.navigate(['home']).then(function () {
                        location.reload();
                    });
                },
                'onfailure': function (error) {
                    console.log(JSON.stringify(error, undefined, 2));
                }
            });
        });
    };
    GoogleAuthService.prototype.googleSignOut = function () {
        var that = this;
        this.loadAPIPromise.then(function () {
            that.auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.removeItem('id_token');
            that.router.navigate(['']);
        });
    };
    GoogleAuthService.prototype.loadGapiScript = function () {
        var node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    return GoogleAuthService;
}());
GoogleAuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], GoogleAuthService);
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=google-auth.service.js.map