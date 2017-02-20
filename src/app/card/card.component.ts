import {Component, OnInit} from '@angular/core';
import {Card} from "../models/card";
import {CardService} from "../services/card.service";
import {Router} from "@angular/router";


@Component({
    selector: 'card',
    templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {
    cards: Card[] = [];

    constructor(private cardService: CardService,
                private router: Router) {

    }

    getCards(): void {
        this.cardService.readCards().subscribe(
            cards => {
                this.cards = cards
            },
            err => {
                console.log(err);
            });
    }

    submitCard(description: string, priority: string) {
        if (!description || !priority) {
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

    deleteCard(card: Card) {
        this.cardService.deleteCard(card.id).subscribe(
            cardObject => {
                let index = -1;
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].id === card.id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    this.cards.splice(index, 1);
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
        this.getCards();
    }

    selectCard(card: Card) {
        this.router.navigate(['/card', card.id]);
    }
}
