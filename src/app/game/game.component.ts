import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, AfterViewInit {
    cards: Card[] = [];
    circleFive: Card[] = [];
    circleFour: Card[] = [];
    circleThree: Card[] = [];
    circleTwo: Card[] = [];
    circleOne: Card[] = [];
    selectedCard: Card;
    isCircleFilled: boolean = false;
    ticks: number = 0;
    subscription;
    sessionId: string;
    session: Session;
    currentParticipant: User;
    userId: string;

    constructor(private sessionService: SessionService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngAfterViewInit() {
        $(document).ready(function () {
            $('#drag').draggable();
        });

    }

    ngOnInit() {
        this.sessionId = this.route.snapshot.params['_id'];

        this.sessionService.readSession(this.sessionId)
            .subscribe(s => {
                    this.session = s;
                    for (let c of s.cardPriorities) {
                        let card = c.card;
                        card.priority = c.priority;
                        this.cards.push(card);
                    }
                    this.currentParticipant = s.participants[0];
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].listNumber = i + 1;
                    }
                },
                err => {
                    console.log(err);
                });

        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
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

        this.nextParticipant();
        this.sessionService.playTurn(this.session, this.userId, card._id).subscribe(
            done => {
            },
            err => {
                console.log(err);
            });
    }

    endSession() {
        if (confirm("Are you sure you wish to end the session?") === true) {
            this.sessionService.stopSession(this.session, this.userId).subscribe(
                done => {
                    this.router.navigate(['/themes']);
                },
                err => {
                    console.log(err);
                });
        }
    }

    unsubTimer(t) {
        if (t === 60) {
            this.nextParticipant();
            this.subscription.unsubscribe();
            let timer = Observable.timer(0, 1000);
            this.subscription = timer.subscribe(t => {
                this.ticks = t;
                this.unsubTimer(t);
            });
        }
    }

    nextParticipant() {
        if (this.currentParticipant === this.session.participants[this.session.participants.length - 1]) {
            this.currentParticipant = this.session.participants[0];
        } else {
            let index = this.session.participants.findIndex(p => p._id === this.currentParticipant._id) + 1;
            this.currentParticipant = this.session.participants[index];
        }
    }
}