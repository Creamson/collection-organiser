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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var item_1 = require("../item");
var item_service_1 = require("../item.service");
var category_1 = require("../category");
var CategoryComponent = (function () {
    function CategoryComponent(itemService, route, location) {
        this.itemService = itemService;
        this.route = route;
        this.location = location;
    }
    CategoryComponent.prototype.getItems = function () {
        var _this = this;
        this.itemService.getItemsOfCategory(this.category).then(function (items) { return _this.items = items; });
    };
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.itemService.getCategory(params['name']); })
            .subscribe(function (category) {
            _this.category = category;
            _this.getItems();
            _this.inputItem = new item_1.Item("", 0, true, _this.category);
        });
    };
    CategoryComponent.prototype.onSelect = function (item) {
        this.selectedItem = item;
    };
    CategoryComponent.prototype.goBack = function () {
        this.location.back();
    };
    CategoryComponent.prototype.updateCheckbox = function (item) {
        item.todo = !item.todo;
        this.itemService.updateItem(item);
        return item.todo;
    };
    CategoryComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.itemService.deleteItem(item).then(function (items) {
            _this.items = items;
            _this.selectedItem = item;
            _this.inputItem = new item_1.Item("", 0, true, _this.category);
        });
        return true;
    };
    CategoryComponent.prototype.saveItem = function (item) {
        var _this = this;
        while (item.name.startsWith(" "))
            item.name = item.name.substring(1);
        while (item.name.endsWith(" "))
            item.name = item.name.substring(0, item.name.length - 1);
        if (item.name != "") {
            this.itemService.addItem(item).then(function (items) {
                _this.items = items;
                _this.selectedItem = item;
                _this.inputItem = new item_1.Item("", 0, true, _this.category);
            });
            return true;
        }
    };
    CategoryComponent.prototype.updateItem = function (item) {
        while (item.name.startsWith(" "))
            item.name = item.name.substring(1);
        while (item.name.endsWith(" "))
            item.name = item.name.substring(0, item.name.length - 1);
        if (item.name != "") {
            this.itemService.updateItem(item);
        }
    };
    CategoryComponent.prototype.deleteCategory = function (category) {
        var _this = this;
        this.itemService.deleteCategory(category).then(function (categories) {
            _this.goBack();
        });
    };
    return CategoryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", category_1.Category)
], CategoryComponent.prototype, "category", void 0);
CategoryComponent = __decorate([
    core_1.Component({
        selector: 'category-my',
        templateUrl: './category.component.html',
        styleUrls: ['./category.component.css']
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService,
        router_1.ActivatedRoute,
        common_1.Location])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map