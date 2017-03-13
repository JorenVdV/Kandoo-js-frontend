import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
    cards: Card[];
    circleFive: Card[] = [];
    circleFour: Card[] = [];
    circleThree: Card[] = [];
    circleTwo: Card[] = [];
    circleOne: Card[] = [];
    selectedCard: Card;
    isCircleFilled: boolean = false;
    ticks: number = 0;
    subscription;

    ngOnInit() {
        this.cards = [
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "1"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "2"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "3"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "4"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "5"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "0"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "7"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "8"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "9"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "10"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "11"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "12"
            }
            ,
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "7"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "8"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "9"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "10"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "11"
            },
            {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed risus fermentum magna placerat aliquet non nec augue. Phasellus vulputate interdum dui eget tempus. Vestibulum facilisis laoreet felis, eget posuere nunc fringilla eu. Duis eu odio lacus. Suspendisse odio mi, ullamcorper vel tempor vitae, elementum vulputate arcu.",
                "priority": 0,
                "_id": "12"
            }
        ];

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].listNumber = i + 1;
        }
    }

    selectCard(card: Card) {
        this.selectedCard = card;
    }

    addToCircle(card: Card) {
        if (this.circleFive.length != 12) {
            if (card.priority === 0) {
                this.cards.splice(this.cards.indexOf(card), 1);
                card.circlePosition = "item-" + (this.circleFive.length + 1);
                this.circleFive.push(card);
                card.priority = 5;
            }
            if (this.circleFive.length === 12) {
                this.isCircleFilled = true;
            }
            if (this.isCircleFilled) {
                let timer = Observable.timer(0, 1000);
                this.subscription = timer.subscribe(t => {
                    this.ticks = t;
                    this.unsubTimer(t);
                });
            }
        }
    }

    increasePriority(card: Card) {
        if (card.priority === 5) {
            this.circleFive.splice(this.circleFive.indexOf(card), 1);
            this.circleFour.push(card);
        }
        if (card.priority === 4) {
            this.circleFour.splice(this.circleFour.indexOf(card), 1);
            this.circleThree.push(card);
        }
        if (card.priority === 3) {
            this.circleThree.splice(this.circleThree.indexOf(card), 1);
            this.circleTwo.push(card);
        }
        if (card.priority === 2) {
            this.circleTwo.splice(this.circleTwo.indexOf(card), 1);
            this.circleOne.push(card);
        }
        card.priority--;

        this.subscription.unsubscribe();
        let timer = Observable.timer(0, 1000);
        this.subscription = timer.subscribe(t => {
            this.ticks = t;
            this.unsubTimer(t);
        });
    }

    unsubTimer(t) {
        if (t === 60) {
            this.subscription.unsubscribe();
        }
    }
}