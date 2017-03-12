import {Component, OnInit} from '@angular/core';
import {Card} from "../../models/card";
import {CardService} from "../../services/card.service";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {Session} from "../../models/session";
import {AlertService} from "../../services/alert.service";

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

    constructor(private cardService: CardService, private route: ActivatedRoute, private sessionService: SessionService, private alertService: AlertService) {
        this.route.params.subscribe(params => {
            this.sessionId = params['_id'];
            this.sessionCards = new Array(0);
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
                    if (this.session.creator == JSON.parse(localStorage.getItem("currentUser"))._id) {
                        this.sessionCards = this.session.sessionCards;
                    }
                    this.cardService.readCards(this.session.theme).subscribe(
                        cards => {
                            if (this.session.creator == JSON.parse(localStorage.getItem("currentUser"))._id) {
                                this.cards = cards;
                                for (let i = 0; i < this.sessionCards.length; i++) {
                                    for (let j = 0; j < this.cards.length; j++) {
                                        if (this.sessionCards[i].description == this.cards[j].description) {
                                            this.cards.splice(j, 1);
                                        }
                                    }
                                }
                            } else {
                                this.cards = this.session.sessionCards;
                            }
                        },
                        err => {

                        });
                },
                err => {

                })
    }

    updateSessionCards() {
        if (this.session.creator != JSON.parse(localStorage.getItem('currentUser'))._id) {
            if (this.sessionCards.length < this.session.minCardsPerParticipant) {
                this.alertService.error("You have to take " + this.session.minCardsPerParticipant + " cards!");
                return;
            }
        }
        this.sessionService.updateSessionCards(this.session, this.sessionCards)
            .subscribe(
                card => {
                    this.alertService.success("Cards updated!");
                },
                err => {
                    console.log(err);
                });
    }

    selectCard(card: Card) {
        if (this.session.creator != JSON.parse(localStorage.getItem("currentUser"))._id) {
            if (this.session.maxCardsPerParticipant <= this.sessionCards.length) {
                this.alertService.error("You can't take more than " + this.session.maxCardsPerParticipant + " cards!");
            } else {
                this.cards.splice(this.cards.indexOf(card), 1);
                this.sessionCards.push(card);
            }
        }
        else {
            this.cards.splice(this.cards.indexOf(card), 1);
            this.sessionCards.push(card);
        }

    }


    deleteCard(card: Card) {
        this.sessionCards.splice(this.sessionCards.indexOf(card), 1);
        this.cards.push(card);
    }

    submitCard(cardDescription: string) {
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
