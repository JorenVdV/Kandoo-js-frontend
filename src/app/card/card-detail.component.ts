import {Params, ActivatedRoute} from "@angular/router";
import {CardService} from "../services/card.service";
import {Card} from "../models/card";
import {OnInit, Component} from "@angular/core";

@Component({
    selector: 'card-detail',
    templateUrl: './card-detail.component.html',
})

export class CardDetailComponent implements OnInit {
    card: Card;

    constructor(private cardService: CardService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.cardService.readCard(+params['_id']))
            .subscribe(card => this.card = card);
    }

    updateCard() {
        this.cardService.updateCard(this.card).subscribe(
            err => {
                console.log(err);
            });
    }
}
