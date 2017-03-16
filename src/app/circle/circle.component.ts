import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";

@Component({
  selector: 'circle',
  templateUrl: 'circle.component.html',
  styleUrls: ['circle.component.css']
})

export class CircleComponent implements OnInit {
  cards: Card[] = [];
  listNumberCards: Card[] = [];
  circlePosCards: Card[] = [];
  circleFive: Card[] = [];
  circleFour: Card[] = [];
  circleThree: Card[] = [];
  circleTwo: Card[] = [];
  circleOne: Card[] = [];
  selectedCard: Card;
  isCircleFilled: boolean = false;
  ticks: number = 0;
  subscription;
  session: Session;
  currentParticipant: User;
  userId: string;
  circleLength = 0;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let sessionId = this.route.snapshot.params['_id'];

    this.sessionService.readSession(sessionId)
      .subscribe(s => {
          console.log(s);
          this.session = s;
          for (let c of s.cardPriorities) {
            let card = c.card;
            card.priority = c.priority;
            this.listNumberCards.push(card);
            if (c.priority === 0) {
              this.cards.push(card);
            } else {
              card.circlePosition = "item-" + (this.circlePosCards.length + 1);
              this.circlePosCards.push(card);

              if (this.circlePosCards.length === 12) {
                this.isCircleFilled = true;
              }

              if (c.priority === 1) {
                this.circleFive.push(card);
              } else if (c.priority === 2) {
                this.circleFour.push(card);
              } else if (c.priority === 3) {
                this.circleThree.push(card);
              } else if (c.priority === 4) {
                this.circleTwo.push(card);
              } else if (c.priority === 5) {
                this.circleOne.push(card);
              }
            }
          }
          this.currentParticipant = s.currentUser;
          for (let i = 0; i < this.listNumberCards.length; i++) {
            this.listNumberCards[i].listNumber = i + 1;
          }
        },
        err => {
          console.log(err);
        });

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.initTimer();
  }

  selectCard(card: Card) {
    console.log(card);
    this.selectedCard = card;
  }

  addToCircle(card: Card) {
    if (card.priority === 0) {
      this.cards.splice(this.cards.indexOf(card), 1);
      card.circlePosition = "item-" + (this.circleFive.length + 1);
      this.circleFive.push(card);
      this.playTurn(card);
    }

    if (this.circleLength === 11) {
      this.isCircleFilled = true;
    }

    this.circleLength = this.circleFive.length
      + this.circleFour.length
      + this.circleThree.length
      + this.circleTwo.length
      + this.circleOne.length;

    this.subscription.unsubscribe();
    this.initTimer();
  }

  increasePriority(card: Card) {
    if (card.priority === 1) {
      this.circleFive.splice(this.circleFive.indexOf(card), 1);
      this.circleFour.push(card);
    }
    if (card.priority === 2) {
      this.circleFour.splice(this.circleFour.indexOf(card), 1);
      this.circleThree.push(card);
    }
    if (card.priority === 3) {
      this.circleThree.splice(this.circleThree.indexOf(card), 1);
      this.circleTwo.push(card);
    }
    if (card.priority === 4) {
      this.circleTwo.splice(this.circleTwo.indexOf(card), 1);
      this.circleOne.push(card);
    }
    this.subscription.unsubscribe();
    this.initTimer();
    this.playTurn(card);
  }

  endSession() {
    this.sessionService.stopSession(this.session, this.userId).subscribe(
      done => {
        this.router.navigate(['/themes']);
      },
      err => {
        console.log(err);
      });
  }

  initTimer() {
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => {
      this.ticks = t;
      this.unsubTimer(t);
    });
  }

  unsubTimer(t) {
    if (t === 60) {
      this.sessionService.skipTurn(this.session, this.currentParticipant._id).subscribe(
        done => {
          this.currentParticipant = done.currentUser;
          this.subscription.unsubscribe();
          this.initTimer();
        },
        err => {
          console.log(err);
        });
    }
  }

  playTurn(card: Card) {
    this.sessionService.playTurn(this.session, this.userId, card._id).subscribe(
      done => {
        this.currentParticipant = done.currentUser;
        card.priority++;
        console.log(done);
      },
      err => {
        console.log(err);
      });
  }
}
