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
    // this.sessionService.readSession(this.sessionId).subscribe(s => {
    //     this.turnHolder = s.currentUser._id;
    //     console.log(s);
    //     this.session = s;
    //     for (let cP of s.cardPriorities) {
    //       let card = cP.card;
    //       card.priority = cP.priority;
    //       this.numberedCards.push(card);
    //       if (cP.priority === 0) {
    //         this.cardsOutOfPlay.push(card);
    //       } else {
    //         card.circlePosition = "item-" + (this.cardsInPlay.length + 1);
    //         this.cardsInPlay.push(card);
    //
    //         if (cP.priority === 1) {
    //           this.circleFive.push(card);
    //         } else if (cP.priority === 2) {
    //           this.circleFour.push(card);
    //         } else if (cP.priority === 3) {
    //           this.circleThree.push(card);
    //         } else if (cP.priority === 4) {
    //           this.circleTwo.push(card);
    //         } else if (cP.priority === 5) {
    //           this.circleOne.push(card);
    //         }
    //
    //         if (this.cardsInPlay.length === 12) {
    //           this.isCircleFilled = true;
    //         }
    //       }
    //     }
    //     if (this.cardsOutOfPlay.length === 0) {
    //       this.isCircleFilled = true;
    //     }
    //     for (let i = 0; i < this.numberedCards.length; i++) {
    //       this.numberedCards[i].listNumber = i + 1;
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   });

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
        this.circleService.setup(this.sessionId, session.participants[nextUserIndex]);
        // this.circleService.setup(this.sessionId, s.currentUser._id);
        this.circleService.circleCards.subscribe(
          data => {
            let cardId = data.cardID;
            // let userId = data.userID;
            let card;
            let index = this.circleFive.findIndex(card => card._id.toString() === cardId);
            if (index === -1) {
              index = this.circleFour.findIndex(card => card._id.toString() === cardId);
              if (index === -1) {
                index = this.circleThree.findIndex(card => card._id.toString() === cardId);
                if (index === -1) {
                  index = this.circleTwo.findIndex(card => card._id.toString() === cardId);
                  if (index !== -1) {
                    console.log('Card belongs to circleTwo');
                    card = this.circleTwo[index];
                  }
                } else {
                  console.log('Card belongs to circleThree');
                  card = this.circleThree[index];
                }
              } else {
                console.log('Card belongs to circleFour');
                card = this.circleFour[index];
              }
            } else {
              console.log('Card belongs to circleFive');
              card = this.circleFive[index];
            }

            if (card) {
              console.log('Found the card! woohoo');
              console.log('Increasing priority of card: ' + card.description + ' card nr: ' + this.numberedCards.find(c => c._id == card._id).listNumber);
              this.increasePriority(card, false);
            }

            // this.updateView(this.circleFive, cc);
            // this.updateView(this.circleFour, cc);
            // this.updateView(this.circleThree, cc);
            // this.updateView(this.circleTwo, cc);
            // this.updateView(this.circleOne, cc);
          },
          error => console.log(error));
        // this.circleService.circleCards.subscribe(
        //   cc => {
        //     console.log('cc: ');
        //     console.log(cc);
        //     console.log();
        //     for (c of s.cardsOutOfPlay) {
        //       if (c._id === cc.cardID) {
        //         this.addToCircle(c, false);
        //         return;
        //       }
        //     }
        //     this.updateView(this.circleFive, cc);
        //     this.updateView(this.circleFour, cc);
        //     this.updateView(this.circleThree, cc);
        //     this.updateView(this.circleTwo, cc);
        //   },
        //   err => {
        //     console.log(err);
        //   });
        this.circleService.circleTurn.subscribe(
          ct => {
            console.log('ct: ');
            console.log(ct);
            console.log();
            if (ct.userID._id)
              this.turnHolder = ct.userID._id;
            else
              this.turnHolder = ct.userID;
          },
          err => {
            console.log(err);
          });

        this.initCards(session.cardPriorities);
        this.turnHolder = session.currentUser._id || session.currentUser;
        console.log('turnHolder: ' + this.turnHolder._id || this.turnHolder);
        console.log('userId: ' + this.userId);
      },
      err => {
        console.log(err);
      });
  }

  initCards(cards) {
    console.log('init Cards');
    for (let i = 0; i < cards.length; i++) {
      let cardPriority = cards[i];
      let card = cardPriority.card;
      card.priority = cardPriority.priority;
      console.log('card: ' + card.description + ' prio: ' + card.priority);
      this.numberedCards.push(card);
      console.log('added to numberedCards');
      this.cardsInPlay.push(card);
      console.log('added to cardsInPlay');
      card.circlePosition = 'item-' + ((this.cardsInPlay.length % 11) + 1);
      console.log('circlePosition: ' + card.circlePosition);
      switch (card.priority) {
        case 0:
          this.circleFive.push(card);
          break;
        case 1:
          this.circleFour.push(card);
          break;
        case 2:
          this.circleThree.push(card);
          break;
        case 3:
          this.circleTwo.push(card);
          break;
        case 4:
          this.circleOne.push(card);
          break;
      }
    }
    for (let i = 0; i < this.numberedCards.length; i++) {
      this.numberedCards[i].listNumber = i + 1;
    }
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
    console.log('selectedcard prio <= 4:');
    console.log(this.selectedCard.priority <= 4);
    console.log('selectedcard prio >= 0:');
    console.log(this.selectedCard.priority >= 0);
    console.log('turnholder = userId:');
    console.log(this.turnHolder === this.userId);
    console.log('turnholder:');
    console.log(this.turnHolder);
    console.log('userId:');
    console.log(this.userId);
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
    if (card.priority === 0) {
      this.circleFive.splice(this.circleFive.indexOf(card), 1);
      this.circleFour.push(card);
    }
    if (card.priority === 1) {
      this.circleFour.splice(this.circleFour.indexOf(card), 1);
      this.circleThree.push(card);
    }
    if (card.priority === 2) {
      this.circleThree.splice(this.circleThree.indexOf(card), 1);
      this.circleTwo.push(card);
    }
    if (card.priority === 3) {
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
