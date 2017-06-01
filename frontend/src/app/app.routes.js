"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var login_page_component_1 = require("./login-page/login-page.component");
var auth_guard_1 = require("app/guards/auth.guard");
var category_component_1 = require("./category/category.component");
exports.routes = [
    { path: '', component: login_page_component_1.LoginPageComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'category/:name', component: category_component_1.CategoryComponent },
    { path: '**', component: login_page_component_1.LoginPageComponent }
];
//# sourceMappingURL=app.routes.js.map