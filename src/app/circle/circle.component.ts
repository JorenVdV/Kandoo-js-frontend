import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Card} from "../models/card";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {CircleService} from "../services/circle.service";

@Component({
  selector: 'circle',
  templateUrl: 'circle.component.html',
  styleUrls: ['circle.component.css']
})

export class CircleComponent implements OnInit, AfterViewInit {
  cardsOutOfPlay: Card[] = [];
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
  turnHolder: string;
  userId: string;
  sessionId: string;

  constructor(private circleService: CircleService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
    this.sessionId = this.route.snapshot.params['_id'];
    this.sessionService.readSession(this.sessionId).subscribe(s => {
        this.turnHolder = s.currentUser._id;
        console.log(s);
        this.session = s;
        for (let cP of s.cardPriorities) {
          let card = cP.card;
          card.priority = cP.priority;
          this.numberedCards.push(card);
          if (cP.priority === 0) {
            this.cardsOutOfPlay.push(card);
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
        if (this.cardsOutOfPlay.length === 0) {
          this.isCircleFilled = true;
        }
        for (let i = 0; i < this.numberedCards.length; i++) {
          this.numberedCards[i].listNumber = i + 1;
        }
      },
      err => {
        console.log(err);
      });

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('#drag').draggable({containment: "#containment-wrapper", scroll: false});
    });
  }

  ngOnInit() {
    this.sessionService.readSession(this.sessionId).subscribe(s => {
        this.circleService.setup(this.sessionId, s.currentUser._id);
        this.circleService.circleCards.subscribe(
          cc => {
            for (c of s.cardsOutOfPlay) {
              if (c._id === cc.cardID) {
                this.addToCircle(c, false);
                return;
              }
            }
            this.updateView(this.circleFive, cc);
            this.updateView(this.circleFour, cc);
            this.updateView(this.circleThree, cc);
            this.updateView(this.circleTwo, cc);
          },
          err => {
            console.log(err);
          });
        this.circleService.circleTurn.subscribe(
          ct => {
            this.turnHolder = ct.userID;
          },
          err => {
            console.log(err);
          });
      },
      err => {
        console.log(err);
      });
  }

  updateView(cards: Card[], cc) {
    for (c of cards) {
      if (c._id === cc.cardID) {
        this.increasePriority(c, false);
        return;
      }
    }
  }

  selectCard(card: Card) {
    this.selectedCard = card;
  }

  addToCircle(card: Card, isLocalTurn: boolean) {
    if (card.priority === 0) {
      this.cardsOutOfPlay.splice(this.cardsOutOfPlay.indexOf(card), 1);
      card.circlePosition = "item-" + (this.circleFive.length + 1);
      this.circleFive.push(card);
      if (isLocalTurn) {
        this.playTurn(card);
      }
    }

    if (this.circleFive === 11 || this.cardsOutOfPlay.length === 0) {
      this.isCircleFilled = true;
    }
  }

  increasePriority(card: Card, isLocalTurn: boolean) {
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

    if (isLocalTurn) {
      this.playTurn(card);
    }
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
    this.circleService.playTurn(card._id, this.userId);
    this.circleService.nextUser();
  }
}
