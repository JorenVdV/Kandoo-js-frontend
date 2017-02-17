import {Component, OnInit} from '@angular/core';
import {Card} from "../models/card";
import {CardService} from "../services/card.service";


@Component({
  moduleId: module.id,
  templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {
  currentCard: Card;
  cards: Card[] = [];

  constructor(private cardService: CardService) {

  }

  ngOnInit() {
    this.cardService.readCard(14).subscribe(card => this.currentCard = card);
    this.loadAllCards();
  }

  private loadAllCards() {
    this.cardService.readCards().subscribe(cards => {
      this.cards = cards;
    });
  }
}
