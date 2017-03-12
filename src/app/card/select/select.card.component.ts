import {Component, OnInit} from '@angular/core';
import {Card} from "../../models/card";
import {CardService} from "../../services/card.service";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {Session} from "../../models/session";

@Component({
    selector: 'selectcard',
    templateUrl: './select.card.component.html'
})

export class SelectCardComponent implements OnInit {
    sessionCards: Card[];
    cards: Card[];
    sessionId: string;
    themeId: string;
    session: Session;
    cardsCanBeAdded: boolean;

    constructor(private cardService: CardService, private route: ActivatedRoute, private sessionService: SessionService) {
        this.route.params.subscribe(params => {
            this.sessionId = params['_id'];
        });
    }

    ngOnInit() {
        this.sessionId = this.route.snapshot.params['_id'];
        this.sessionService.readSession(this.sessionId)
            .subscribe(s => {
                    this.session = s;
                    this.themeId = s.theme;
                    if (this.session.cardsCanBeAdded) {
                        this.cardsCanBeAdded = true;
                    }
                    this.sessionCards = this.session.sessionCards;

                    this.cardService.readCards(this.session.theme).subscribe(
                        cards => {
                            this.cards = cards;
                            for (var i = 0; i < this.sessionCards; i++) {
                                this.cards.splice(this.cards.indexOf(this.sessionCards[i]), 1);
                            }

                        },
                        err => {

                        });
                },
                err => {

                })


    }

    updateSessionCards() {
        this.sessionService.updateSessionCards(this.session, this.sessionCards)
            .subscribe(
                card => {
                    alert("Cards added to session!")
                },
                err => {
                    console.log(err);
                });
    }

    selectCard(card: Card) {
        this.cards.splice(this.cards.indexOf(card), 1);
        this.sessionCards.push(card);

    }


    deleteCard(card: Card) {
        this.sessionCards.splice(this.sessionCards.indexOf(card), 1);
        this.cards.push(card);
    }

    submitCard(cardDescription: string){
        if (!description) {
            return;
        }
        this.cardService.createCard(cardDescription, this.themeId).subscribe(
            card => {
                this.cards.push(card);
            },
            err => {
                console.log(err);
            });
    }
}
