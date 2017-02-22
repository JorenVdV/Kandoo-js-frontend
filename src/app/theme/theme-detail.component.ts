import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Theme} from "../models/theme";
import {ThemeService} from "../services/theme.service";
import {Card} from "../models/card";
import {CardService} from "../services/card.service";

@Component({
    selector: 'theme-detail',
    templateUrl: './theme-detail.component.html',
})

export class ThemeDetailComponent implements OnInit {
    theme: Theme;
    cards: Card[];

    constructor(private themeService: ThemeService,
                private cardService: CardService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.themeService.readTheme(+params['id']))
            .subscribe(theme => {
                this.theme = theme;
                this.cards = theme.cards;
            });
    }

    updateTheme() {
        this.themeService.updateTheme(this.theme).subscribe(
            err => {
                console.log(err);
            });
    }

    deleteCard(card: Card) {
        this.cardService.deleteCard(card.id).subscribe(
            cardObject => {
                let index = -1;
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].id === card.id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    this.cards.splice(index, 1);
            },
            err => {
                console.log(err);
            });
    }

    selectCard(card: Card) {
        this.router.navigate(['/card', card.id]);
    }
}
