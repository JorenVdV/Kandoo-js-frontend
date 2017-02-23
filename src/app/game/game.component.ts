import {Component} from "@angular/core";
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
            "priority": 5,
            "id": 14
        },
        {
            "description": "card02",
            "priority": 5,
            "id": 15
        },
        {
            "description": "card03",
            "priority": 5,
            "id": 17
        }
    ];
    circleFive: Card[] = [];
    circleFour: Card[] = [];
    circleThree: Card[] = [];
    circleTwo: Card[] = [];
    circleOne: Card[] = [];

    onClick(card: Card, id: number) {
        card.priority--;

        if (id === 0) {
            this.cards.splice(this.cards.indexOf(card), 1);
            this.circleFive.push(card);
        }
        if (id === 5) {
            this.circleFive.splice(this.cards.indexOf(card), 1);
            this.circleFour.push(card);
        }
        if (id === 4) {
            this.circleFour.splice(this.cards.indexOf(card), 1);
            this.circleThree.push(card);
        }
        if (id === 3) {
            this.circleThree.splice(this.cards.indexOf(card), 1);
            this.circleTwo.push(card);
        }
        if (id === 2) {
            this.circleTwo.splice(this.cards.indexOf(card), 1);
            this.circleOne.push(card);
        }
    }
}