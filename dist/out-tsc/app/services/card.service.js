var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from "rxjs";
export var CardService = (function () {
    function CardService(http) {
        this.http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.cardUrl = 'http://localhost:3000/cards';
    }
    CardService.prototype.createCard = function (card) {
        return this.http
            .post(this.cardUrl, JSON.stringify({
            card: card
        }), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    CardService.prototype.readCard = function (id) {
        var url = this.cardUrl + "/" + id;
        return this.http
            .get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    CardService.prototype.readCards = function () {
        return this.http
            .get(this.cardUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    CardService.prototype.updateCard = function (Card) {
        var url = this.cardUrl + "/" + Card.id;
        return this.http
            .put(url, JSON.stringify(Card), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    CardService.prototype.deleteCard = function (id) {
        var url = this.cardUrl + "/" + id;
        return this.http
            .delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    CardService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], CardService);
    return CardService;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/services/card.service.js.map