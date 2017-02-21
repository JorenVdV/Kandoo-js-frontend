import {Component} from '@angular/core';
import {Card} from "../models/card";
import {CardService} from "../services/card.service";

@Component({
    selector: 'card',
    templateUrl: 'card.component.html'
})

export class CardComponent {
    cards: Card[] = [];

    constructor(private cardService: CardService) {

    }

    submitCard(description: string) {
        if (!description) {
            return;
        }
        this.cardService.createCard(description).subscribe(
            card => {
                this.cards.push(card);
            },
            err => {
                console.log(err);
            });
    }
}
