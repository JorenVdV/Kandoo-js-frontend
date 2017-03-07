import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit{
    cards: Card[];
    circleFive: Card[] = [];
    circleFour: Card[] = [];
    circleThree: Card[] = [];
    circleTwo: Card[] = [];
    circleOne: Card[] = [];
    selectedCard: Card;

    ngOnInit() {
        this.cards = [
            {
                "description": "card01",
                "priority": 6,
                "listNumber": "1",
                "_id": "1"
            },
            {
                "description": "card02",
                "priority": 6,
                "listNumber": "2",
                "_id": "2"
            },
            {
                "description": "card03",
                "priority": 6,
                "listNumber": "3",
                "_id": "3"
            },
            {
                "description": "card04",
                "priority": 6,
                "listNumber": "4",
                "_id": "4"
            },
            {
                "description": "card05",
                "priority": 6,
                "listNumber": "5",
                "_id": "5"
            },
            {
                "description": "card06",
                "priority": 6,
                "listNumber": "6",
                "_id": "6"
            },
            {
                "description": "card07",
                "priority": 6,
                "listNumber": "7",
                "_id": "7"
            },
            {
                "description": "card08",
                "priority": 6,
                "listNumber": "8",
                "_id": "8"
            },
            {
                "description": "card09",
                "priority": 6,
                "listNumber": "9",
                "_id": "9"
            },
            {
                "description": "card10",
                "priority": 6,
                "listNumber": "10",
                "_id": "10"
            },
            {
                "description": "card11",
                "priority": 6,
                "listNumber": "11",
                "_id": "11"
            },
            {
                "description": "card12",
                "priority": 6,
                "listNumber": "12",
                "_id": "12"
            }
        ];
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].circlePosition = "item-" + (i + 1);
        }
    }

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