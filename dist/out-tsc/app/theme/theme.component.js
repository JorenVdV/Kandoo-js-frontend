var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ThemeService } from "../services/theme.service";
export var ThemeComponent = (function () {
    function ThemeComponent(themeService, router) {
        this.themeService = themeService;
        this.router = router;
    }
    ThemeComponent.prototype.getThemes = function () {
        var _this = this;
        this.themeService.readThemes().subscribe(function (themes) {
            _this.themes = themes;
        }, function (err) {
            console.log(err);
        });
    };
    ThemeComponent.prototype.submitTheme = function (name, description, tags, publicAccess) {
        var _this = this;
        if (!name || !description || !tags) {
            return;
        }
        this.themeService.createTheme(name, description, tags, publicAccess).subscribe(function (theme) {
            _this.themes.push(theme);
        }, function (err) {
            console.log(err);
        });
    };
    ThemeComponent.prototype.deleteTheme = function (theme) {
        var _this = this;
        this.themeService.deleteTheme(theme.id).subscribe(function (themeObject) {
            var index = -1;
            for (var i = 0; i < _this.themes.length; i++) {
                if (_this.themes[i].id === theme.id) {
                    index = i;
                    break;
                }
            }
            if (index != -1)
                _this.themes.splice(index, 1);
        }, function (err) {
            console.log(err);
        });
    };
    ThemeComponent.prototype.ngOnInit = function () {
        this.getThemes();
    };
    ThemeComponent.prototype.selectTheme = function (theme) {
        this.router.navigate(['/theme', theme.id]);
    };
    ThemeComponent = __decorate([
        Component({
            selector: 'theme',
            templateUrl: './theme.component.html',
        }), 
        __metadata('design:paramtypes', [ThemeService, Router])
    ], ThemeComponent);
    return ThemeComponent;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/theme/theme.component.js.map