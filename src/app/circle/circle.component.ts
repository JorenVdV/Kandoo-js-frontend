import {Component, OnInit, AfterViewInit} from "@angular/core";
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

export class CircleComponent implements OnInit, AfterViewInit {
  cards: Card[] = [];
  numberedCards: Card[] = [];
  cardsInPlay: Card[] = [];
  circleFive: Card[] = [];
  circleFour: Card[] = [];
  circleThree: Card[] = [];
  circleTwo: Card[] = [];
  circleOne: Card[] = [];
  selectedCard: Card;
  isCircleFilled: boolean = false;
  session: Session;
  turnHolder: User;
  userId: string;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('#drag').draggable({ containment: "#containment-wrapper", scroll: false });
    });

  }

  ngOnInit() {
    let sessionId = this.route.snapshot.params['_id'];

    this.sessionService.readSession(sessionId).subscribe(s => {
        this.session = s;
        for (let cP of s.cardPriorities) {
          let card = cP.card;
          card.priority = cP.priority;
          this.numberedCards.push(card);
          if (cP.priority === 0) {
            this.cards.push(card);
          } else {
            card.circlePosition = "item-" + (this.cardsInPlay.length + 1);
            this.cardsInPlay.push(card);

            if (cP.priority === 1) {
              this.circleFive.push(card);
            } else if (cP.priority === 2) {
              this.circleFour.push(card);
            } else if (cP.priority === 3) {
              this.circleThree.push(card);
            } else if (cP.priority === 4) {
              this.circleTwo.push(card);
            } else if (cP.priority === 5) {
              this.circleOne.push(card);
            }

            if (this.cardsInPlay.length === 12) {
              this.isCircleFilled = true;
            }
          }
        }
        if (this.cards.length === 0) {
          this.isCircleFilled = true;
        }
        this.turnHolder = s.currentUser;
        for (let i = 0; i < this.numberedCards.length; i++) {
          this.numberedCards[i].listNumber = i + 1;
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
    if (card.priority === 0) {
      this.cards.splice(this.cards.indexOf(card), 1);
      card.circlePosition = "item-" + (this.circleFive.length + 1);
      this.circleFive.push(card);
      this.playTurn(card);
    }

    if (this.circleFive === 11 || this.cards.length === 0) {
      this.isCircleFilled = true;
    }
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

  playTurn(card: Card) {
    this.sessionService.playTurn(this.session, this.userId, card._id).subscribe(
      done => {
        for (let cP of done.cardPriorities) {
          if (cP.card._id === card._id) {
            card.priority = cP.priority;
          }
        }
        this.turnHolder = done.currentUser;
      },
      err => {
        console.log(err);
      });
  }
}
