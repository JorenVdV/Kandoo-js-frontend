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
  selectedCard: Card;
  session: Session;
  turnHolder: string;
  userId: string;
  sessionId: string;

  cardsOnCircle: Card[] = [];

  fullyLoaded: boolean = false;

  mostRecentTurn: Card;

  constructor(private circleService: CircleService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
    this.sessionId = this.route.snapshot.params['_id'];
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('#drag').draggable({containment: "#containment-wrapper", scroll: false});
    });
  }

  ngOnInit() {
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
  }

  initCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      let cardPriority = cards[i];
      let card = cardPriority.card;
      card.priority = 0;
      card.circlePosition = 'item-' + ((i % 12) + 1);
      card.listNumber = i + 1;
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
    else if(this.mostRecentTurn && this.mostRecentTurn._id == card._id)
      return "#FF9B7C";
    else
      return "#f8f8f8"
  }

  getCardsOfPriority(priority: number) {
    return this.cardsOnCircle.filter(c => c.priority === priority);
  }
}
