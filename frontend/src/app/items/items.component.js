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
var item_service_1 = require("../item.service");
var router_1 = require("@angular/router");
var ItemsComponent = (function () {
    function ItemsComponent(router, itemService) {
        this.router = router;
        this.itemService = itemService;
    }
    ItemsComponent.prototype.getItems = function () {
        var _this = this;
        this.itemService.getItems().then(function (items) { return _this.items = items; });
    };
    ItemsComponent.prototype.ngOnInit = function () {
        this.getItems();
    };
    ItemsComponent.prototype.onSelect = function (item) {
        this.selectedItem = item;
    };
    ItemsComponent.prototype.gotoDetail = function () {
        console.log('ZSA detail' + this.selectedItem.category.name);
        this.router.navigate(['/detail', this.selectedItem.id]);
    };
    ItemsComponent.prototype.gotoCategory = function () {
        console.log('ZSA category' + this.selectedItem.category.name);
        this.router.navigate(['/category', this.selectedItem.category.id]);
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: 'items',
        templateUrl: './items.component.html',
        styleUrls: ['./items.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=items.component.js.map