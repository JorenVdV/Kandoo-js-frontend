var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
export var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get('http://api.teamjs.xyz/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get('http://api.teamjs.xyz/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        console.log(user);
        console.log(JSON.stringify(user));
        return this.http.post('http://api.teamjs.xyz/register', JSON.stringify(user), this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        //return this.http.put('http://api.teamjs.xyz/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete('http://api.teamjs.xyz/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/services/user.service.js.map