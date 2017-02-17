var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { ThemeService } from "./theme.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
export var ThemeDetailComponent = (function () {
    function ThemeDetailComponent(themeService, route, location) {
        this.themeService = themeService;
        this.route = route;
        this.location = location;
    }
    ThemeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.themeService.readTheme(+params['id']); })
            .subscribe(function (theme) { return _this.theme = theme; });
    };
    ThemeDetailComponent.prototype.updateTheme = function () {
        this.themeService.updateTheme(this.theme).subscribe(function (err) {
            console.log(err);
        });
        this.location.back();
    };
    ThemeDetailComponent = __decorate([
        Component({
            selector: 'theme-detail',
            templateUrl: './theme-detail.component.html',
            styleUrls: ['./theme-detail.component.css']
        }), 
        __metadata('design:paramtypes', [ThemeService, ActivatedRoute, Location])
    ], ThemeDetailComponent);
    return ThemeDetailComponent;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoo-js-frontend/src/app/theme-detail.component.js.map