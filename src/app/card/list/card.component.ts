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
    id: string;

    constructor(private cardService: CardService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = params['_id'];   //<----- + sign converts string value to number
        });
        console.log(this.id);
    }

    ngOnInit() {
        this.cardService.readCards(this.id).subscribe(
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
        this.cardService.createCard(description, this.id).subscribe(
            card => {
                this.cards.push(card);
            },
            err => {
                console.log(err);
            });
    }

    deleteCard(card: Card){
        this.cardService.deleteCard(card._id).subscribe(
            done => {
                this.cards.splice(this.cards.indexOf(c => c._id === card._id), 1);
            },
            err => {
                console.log(err);
            });
    }
}
