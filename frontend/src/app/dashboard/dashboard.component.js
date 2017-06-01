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
var category_1 = require("../category");
var DashboardComponent = (function () {
    function DashboardComponent(itemService) {
        this.itemService = itemService;
        this.categories = [];
    }
    DashboardComponent.prototype.getCategories = function () {
        var _this = this;
        console.log("o;a");
        this.categories.push(new category_1.Category("tu jestem"));
        this.itemService.getCategories()
            .then(function (categories) { return _this.categories = categories; });
        this.categories.push(new category_1.Category("BOOKS"));
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map