import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent {
    cards: Card[] = [
        {
            "description": "card01",
            "priority": 6,
            "_id": "1"
        },
        {
            "description": "card02",
            "priority": 6,
            "_id": "2"
        },
        {
            "description": "card03",
            "priority": 6,
            "_id": "3"
        },
        {
            "description": "card04",
            "priority": 6,
            "_id": "4"
        },
        {
            "description": "card05",
            "priority": 6,
            "_id": "5"
        },
        {
            "description": "card06",
            "priority": 6,
            "_id": "6"
        },
        {
            "description": "card07",
            "priority": 6,
            "_id": "7"
        },
        {
            "description": "card08",
            "priority": 6,
            "_id": "8"
        }
    ];
    circleFive: Card[] = [];
    circleFour: Card[] = [];
    circleThree: Card[] = [];
    circleTwo: Card[] = [];
    circleOne: Card[] = [];
    selectedCard: Card;

    onClick(card: Card) {
        this.selectedCard = card;
    }

    increasePriority(card: Card) {
        if (card.priority === 6) {
            this.cards.splice(this.cards.indexOf(card), 1);
            this.circleFive.push(card);
        }
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
    }
}