import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
})

export class ChatComponent implements OnInit {

    activeUsers: User[];
    session: Session;
    user: User[];

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private chatService: ChatService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    ngOnInit() {
        this.sessionId = this.route.snapshot.params['_id'];


        this.sessionService.readSession(this.sessionId)
            .subscribe(s => {
                    this.session = s;
                    this.cards = this.session.cardPriorities;
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].listNumber = i + 1;
                    }
                },
                err => {
                    console.log(err);
                });

    }

    selectCard(card: Card) {
        this.selectedCard = card;
    }

    addToCircle(card: Card) {
        if (this.circleFive.length != 12) {
            if (card.priority === 6) {
                this.cards.splice(this.cards.indexOf(card), 1);
                card.circlePosition = "item-" + (this.circleFive.length + 1);
                this.circleFive.push(card);
                card.priority--;
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