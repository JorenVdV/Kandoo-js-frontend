import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'theme-detail',
    templateUrl: 'theme-detail.component.html',
})

export class ThemeDetailComponent implements OnInit {
    theme = new Theme();
    sessions: Sessions[];

    constructor(private themeService: ThemeService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        let id = this.route.snapshot.params['_id'];
        if (id) {
            this.themeService.readTheme(id)
                .subscribe(t => {
                        this.theme = t;
                    },
                    err => {
                        console.log(err);
                    });
            this.themeService.readThemeSessions(id).subscribe(
                sessions => {
                    this.sessions = sessions
                },
                err => {
                    console.log(err);
                });
        }

    }

    saveTheme() {
        if (this.theme._id) {
            this.themeService.updateTheme(this.theme).subscribe(
                done => {
                    this.navigateToThemes();
                },
                err => {
                    console.log(err);
                });
        } else {
            this.themeService.createTheme(this.theme).subscribe(
                done => {
                    this.navigateToThemes();
                },
                err => {
                    console.log(err);
                });
        }
    }

    addCards(theme: Theme) {
        this.router.navigate(['/theme/', theme._id, 'cards']);
    }

    deleteTheme(theme: Theme) {
        this.themeService.deleteTheme(theme._id).subscribe(
            done => {
                this.navigateToThemes();
            },
            err => {
                console.log(err);
            });
    }

    navigateToThemes() {
        this.router.navigate(['themes']);
    }

    selectSession(session: Session) {
        this.router.navigate(['/session', session._id]);
    }
}
