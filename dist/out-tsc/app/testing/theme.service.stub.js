var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
export var ThemeServiceStub = (function () {
    function ThemeServiceStub() {
        this.themes = [
            {
                "name": "test01",
                "description": "test",
                "tags": "test",
                "publicAccess": false,
                "id": 14
            },
            {
                "name": "test02",
                "description": "test",
                "tags": "test",
                "publicAccess": false,
                "id": 15
            },
            {
                "name": "test03",
                "description": "djsmfqjm",
                "tags": "mjm",
                "publicAccess": false,
                "id": 17
            }
        ];
    }
    ThemeServiceStub.prototype.createTheme = function (name, description, tags, publicAccess) {
        return JSON.stringify({ name: name, description: description, tags: tags, publicAccess: publicAccess });
    };
    ThemeServiceStub.prototype.readTheme = function () {
        return this.themes.find(this.findTheme);
    };
    ThemeServiceStub.prototype.readThemes = function () {
        return this.themes;
    };
    ThemeServiceStub.prototype.findTheme = function (theme) {
        return theme.id === 15;
    };
    ThemeServiceStub.prototype.deleteTheme = function () {
        this.themes.splice(this.themes.findIndex(this.findTheme), 1);
        return this.themes;
    };
    ThemeServiceStub = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], ThemeServiceStub);
    return ThemeServiceStub;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/testing/theme.service.stub.js.map