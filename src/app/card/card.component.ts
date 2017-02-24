import {Component} from '@angular/core';
import {Card} from "../models/card";
import {CardService} from "../services/card.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'card',
    templateUrl: 'card.component.html'
})

export class CardComponent {
    cards: Card[] = [];
    id: string;

    constructor(private cardService: CardService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = params['_id'];   //<----- + sign converts string value to number
        });
        console.log(this.id);
    }


    submitCard(description: string, id: string) {
        if (!description) {
            return;
        }
        this.cardService.createCard(description, id).subscribe(
            card => {
                this.cards.push(card);
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
        this.cardService.readCards(this.id).subscribe(
            cards => {
                this.cards = cards;
                console.log(this.cards)
            },
            err => {
                console.log(err);
            });

    }
}
