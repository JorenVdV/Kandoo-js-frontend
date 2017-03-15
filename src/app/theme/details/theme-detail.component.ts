import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";
import {Session} from "../../models/session";

@Component({
    selector: 'theme-detail',
    templateUrl: 'theme-detail.component.html',
})

export class ThemeDetailComponent implements OnInit {
    theme: Theme;
    sessions: Session[];
    userId: string;
    isOrganiser: boolean;

    constructor(private themeService: ThemeService,
                private route: ActivatedRoute,
                private router: Router) {
        this.theme = new Theme();
    }

    ngOnInit() {

        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        let id = this.route.snapshot.params['_id'];
        if (id) {
            this.themeService.readTheme(id)
                .subscribe(t => {
                        this.isOrganiser = false;
                        this.theme = t;
                        for (let i = 0; i < this.theme.organisers.length; i++) {
                            if (this.userId == this.theme.organisers[i]._id) {
                                this.isOrganiser = true;
                                return;
                            }
                        }
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
        } else {
            this.isOrganiser = true;
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
