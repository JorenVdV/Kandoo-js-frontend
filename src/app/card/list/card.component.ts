import {Component, OnInit} from '@angular/core';
import {Card} from "../../models/card";
import {CardService} from "../../services/card.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'card',
    templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit{
    cards: Card[] = [];
    themeId: string;

    constructor(private cardService: CardService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.themeId = params['_id'];   //<----- + sign converts string value to number
        });
        console.log(this.themeId);
    }

    ngOnInit() {
        this.cardService.readCards(this.themeId).subscribe(
            cards => {
                this.cards = cards;
            },
            err => {
                console.log(err);
            });
    }

    submitCard(description: string) {
        if (!description) {
            return;
        }
        this.cardService.createCard(description, this.themeId).subscribe(
            card => {
                console.log(card);

                this.cards.push(card);
            },
            err => {
                console.log(err);
            });
    }

    deleteCard(card: Card){
        this.cardService.deleteCard(card._id).subscribe(
            done => {
                this.cardService.readCards(this.themeId).subscribe(
                    cards => {
                        this.cards = cards;
                    },
                    err => {
                        console.log(err);
                    });
            },
            err => {
                console.log(err);
            });
    }
}
