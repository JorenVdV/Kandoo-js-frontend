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
import { CardService } from "../services/card.service";
export var CardComponent = (function () {
    function CardComponent(cardService) {
        this.cardService = cardService;
        this.cards = [];
    }
    CardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cardService.readCard(14).subscribe(function (card) { return _this.currentCard = card; });
        this.loadAllCards();
    };
    CardComponent.prototype.loadAllCards = function () {
        var _this = this;
        this.cardService.readCards().subscribe(function (cards) {
            _this.cards = cards;
        });
    };
    CardComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'card.component.html'
        }), 
        __metadata('design:paramtypes', [CardService])
    ], CardComponent);
    return CardComponent;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/card/card.component.js.map