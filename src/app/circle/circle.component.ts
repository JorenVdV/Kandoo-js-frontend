import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Card} from "../models/card";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {CircleService} from "../services/circle.service";
import {User} from "../models/user";

@Component({
  selector: 'circle',
  templateUrl: 'circle.component.html',
  styleUrls: ['circle.component.css']
})

export class CircleComponent implements OnInit, AfterViewInit {
  selectedCard: Card;
  session: Session;
  turnHolder: string;
  userId: string;
  sessionId: string;

  cardsOnCircle: Card[] = [];
  participants: User[] = [];
  turnEvents: any[] = [];
  reverseTurns: any[] = [];

  fullyLoaded: boolean = false;
  isCircle: boolean = false;

  mostRecentTurn: Card;

  constructor(private circleService: CircleService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.route.url._value[2].path === "circle") {
      this.isCircle = true;
    } else if (this.route.url._value[2].path === "history") {
      this.isCircle = false;
    }
    this.sessionId = this.route.snapshot.params['_id'];
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('#drag').draggable({containment: "#containment-wrapper", scroll: false});
    });
  }

  ngOnInit() {
    if (this.isCircle) {
      this.sessionService.readSession(this.sessionId).subscribe(session => {
          this.session = session;
          let currUserIndex = session.participants.findIndex(user => user._id.toString() === this.userId.toString());
          let nextUserIndex = (currUserIndex < session.participants.length - 1) ? currUserIndex + 1 : 0;
          this.circleService.setup(this.sessionId, session.participants[nextUserIndex]._id);
          this.circleService.circleCards.subscribe(
            data => {
              let cardId = data.cardID;
              let cardIndex = this.cardsOnCircle.findIndex(card => card._id == cardId);
              let card = this.cardsOnCircle[cardIndex];
              if (card) {
                this.mostRecentTurn = card;
                card.priority++;
                this.increasePriority(card, false);
              }
            },
            error => console.log(error));
          this.circleService.circleTurn.subscribe(
            ct => {
              let ctIndex = this.session.participants.findIndex(user => user._id == ct.userID);
              this.turnHolder = this.session.participants[ctIndex];
            },
            err => {
              console.log(err);
            });

          this.initCards(session.cardPriorities);
          this.turnHolder = session.currentUser;
          this.fullyLoaded = true;
        },
        err => {
          console.log(err);
        });
    } else if (!this.isCircle) {
      this.sessionService.readSession(this.sessionId).subscribe(session => {
        this.session = session;
        this.participants = session.participants;
        this.initCards(session.cardPriorities);

        this.sessionService.historySession(this.sessionId).subscribe(history => {
          let filteredEvents = history.events.filter(e => e.eventType === "turn")
          this.turnEvents = filteredEvents;
          this.findTurnholder(filteredEvents, session.participants);
        });
      });
      this.fullyLoaded = true;
    }
  }

  initCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      let cardPriority = cards[i];
      let card = cardPriority.card;
      card.priority = 0;
      card.listNumber = i + 1;
      card.circlePosition = 'item-' + ((i % 12) + 1);

      this.cardsOnCircle.push(card);
    }
  }


  selectCard(card: Card) {
    this.selectedCard = card;
  }


  increasePriority(card: Card, isLocalTurn: boolean) {
    if (isLocalTurn && card.priority < 4) {
      this.playTurn(card);
    }
  }

  nextMove() {
    for (let i = 0; i < this.cardsOnCircle.length; i++) {
      let card = this.cardsOnCircle[i];
      if (this.turnEvents.length != 0) {
        if (card._id === this.turnEvents[0].content) {
          card.priority++;
          this.mostRecentTurn = card;
          this.reverseTurns.push(this.turnEvents[0]);
          this.turnEvents.splice(0, 1);
          this.findTurnholder(this.turnEvents, this.participants);
          return;
        }
      }
    }
  }

  previousMove() {
    let lastCard = this.reverseTurns.length - 1;

    for (let i = 0; i < this.cardsOnCircle.length; i++) {
      let card = this.cardsOnCircle[i];
      if (this.reverseTurns[lastCard] != undefined) {
        if (card._id === this.reverseTurns[lastCard].content) {
          card.priority--;
          this.turnEvents.unshift(this.reverseTurns[lastCard]);
          this.reverseTurns.splice(lastCard, 1);
          this.findTurnholder(this.turnEvents, this.participants);
          this.mostRecentTurn = card;
          return;
        }
      }
    }
  }

  findTurnholder(list: any[], participants: User[]) {
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      if (list.length != 0) {
        if (participant._id === list[0].userId) {
          this.turnHolder = participant;
        }
      }
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
    this.selectedCard = undefined;
  }

  getBackgroundColor(card: Card) {
    if (this.selectedCard && this.selectedCard._id == card._id)
      return "#A6E883";
    else if (this.mostRecentTurn && this.mostRecentTurn._id == card._id)
      return "#FF9B7C";
    else
      return "#f8f8f8"
  }

  getCardsOfPriority(priority: number) {
    return this.cardsOnCircle.filter(c => c.priority === priority);
  }
}
