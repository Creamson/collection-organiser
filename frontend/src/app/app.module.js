"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var google_login_component_1 = require("./google-login/google-login.component");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var login_page_component_1 = require("./login-page/login-page.component");
var app_routes_1 = require("./app.routes");
var auth_guard_1 = require("./guards/auth.guard");
var google_auth_service_1 = require("./google-auth/google-auth.service");
var angular2_jwt_1 = require("angular2-jwt");
var item_detail_component_1 = require("./item-detail/item-detail.component");
var items_component_1 = require("./items/items.component");
var item_service_1 = require("./item.service");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var category_component_1 = require("./category/category.component");
function authHttpServiceFactory(http, options) {
    return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
        tokenName: 'id_token',
        globalHeaders: [{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Accept': 'application/json'
            }]
    }), http, options);
}
exports.authHttpServiceFactory = authHttpServiceFactory;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            google_login_component_1.GoogleLoginComponent,
            home_component_1.HomeComponent,
            login_page_component_1.LoginPageComponent,
            item_detail_component_1.ItemDetailComponent,
            items_component_1.ItemsComponent,
            dashboard_component_1.DashboardComponent,
            category_component_1.CategoryComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(app_routes_1.routes, {
                useHash: true
            })
        ],
        providers: [auth_guard_1.AuthGuard, google_auth_service_1.GoogleAuthService, {
                provide: angular2_jwt_1.AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [http_1.Http, http_1.RequestOptions]
            }, item_service_1.ItemService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map