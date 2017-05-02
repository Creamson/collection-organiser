"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mock_items_1 = require("./mock-items");
var mock_categories_1 = require("./mock-categories");
var ItemService = (function () {
    function ItemService() {
    }
    ItemService.prototype.getItems = function () {
        return Promise.resolve(mock_items_1.ITEMS);
    };
    ItemService.prototype.getCategories = function () {
        return Promise.resolve(mock_categories_1.CATEGORIES);
    };
    ItemService.prototype.getItemsOfCategory = function (category) {
        return this.getItems()
            .then(function (items) { return items.filter(function (item) { return item.category === category; }); });
    };
    ItemService.prototype.getItem = function (id) {
        return this.getItems()
            .then(function (items) { return items.find(function (item) { return item.id === id; }); });
    };
    ItemService.prototype.getCategory = function (id) {
        return this.getCategories()
            .then(function (categories) { return categories.find(function (category) { return category.id === id; }); });
    };
    return ItemService;
}());
ItemService = __decorate([
    core_1.Injectable()
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map