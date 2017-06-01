"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var login_page_component_1 = require("./login-page/login-page.component");
var auth_guard_1 = require("app/guards/auth.guard");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var item_detail_component_1 = require("./item-detail/item-detail.component");
var category_component_1 = require("./category/category.component");
var items_component_1 = require("./items/items.component");
exports.routes = [
    { path: '', component: login_page_component_1.LoginPageComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'detail/:id', component: item_detail_component_1.ItemDetailComponent },
    { path: 'category/:name', component: category_component_1.CategoryComponent },
    { path: 'items', component: items_component_1.ItemsComponent },
    { path: '**', component: login_page_component_1.LoginPageComponent }
];
//# sourceMappingURL=app.routes.js.map