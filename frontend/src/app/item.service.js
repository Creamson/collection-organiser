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
var mock_items_1 = require("./mock-items");
var category_1 = require("./category");
var angular2_jwt_1 = require("angular2-jwt");
var constants_1 = require("../assets/constants");
require("rxjs/add/operator/first");
require("rxjs/add/operator/toPromise");
var ItemService = (function () {
    function ItemService(authHttp) {
        this.authHttp = authHttp;
        this.url = constants_1.apiPath + 'collections';
        this.requestBody = "";
        this.id_token = localStorage.getItem('id_token');
        this.decodedJwt = new angular2_jwt_1.JwtHelper().decodeToken(this.id_token);
        this.response = 'nothing received yet';
    }
    ItemService.prototype.getItems = function () {
        return Promise.resolve(mock_items_1.ITEMS);
    };
    ItemService.prototype.getCategories = function () {
        return Promise.resolve(this.authHttp.get(this.url, this.requestBody).toPromise().then(function (response) {
            var categories = [];
            for (var _i = 0, _a = response.json(); _i < _a.length; _i++) {
                var entry = _a[_i];
                categories.push(new category_1.Category(entry.name));
            }
            return categories;
        }));
    };
    ItemService.prototype.getItemsOfCategory = function (category) {
        return Promise.resolve(this.authHttp.get(this.url + "/" + category.name, this.requestBody).toPromise().then(function (response) {
            var items = [];
            for (var _i = 0, _a = response.json(); _i < _a.length; _i++) {
                var entry = _a[_i];
                //items.push(new Item(entry.name));
                console.log(entry);
            }
            return items;
        }));
    };
    ItemService.prototype.getItem = function (id) {
        return this.getItems()
            .then(function (items) { return items.find(function (item) { return item.id === id; }); });
    };
    ItemService.prototype.getCategory = function (name) {
        return this.getCategories()
            .then(function (categories) { return categories.find(function (category) { return category.name === name; }); });
    };
    ItemService.prototype.ngOnInit = function () {
    };
    return ItemService;
}());
ItemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map