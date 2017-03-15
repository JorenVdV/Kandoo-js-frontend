import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'theme-list',
    templateUrl: 'theme-list.component.html',
})

export class ThemeListComponent implements OnInit {
    themes: Theme[];

    constructor(private themeService: ThemeService,
                private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.themeService.readThemes().subscribe(
            themes => {
                this.themes = themes
            },
            err => {
                console.log(err);
            });
    }

    selectTheme(theme: Theme) {
        this.router.navigate(['/theme/', theme._id]);
    }

    createTheme() {
        this.router.navigate(['/theme']);
    }

    deleteTheme(theme: Theme) {
        this.themeService.deleteTheme(theme._id).subscribe(
            done => {
                this.themes.splice(this.themes.findIndex(t=> t._id === theme._id) , 1);
            },
            err => {
                console.log(err);
            });
    }

    addCards(theme: Theme) {
        this.router.navigate(['/theme/', theme._id, 'cards']);
    }

    getSessions(theme: Theme) {
        this.router.navigate(['/theme/', theme._id, 'themesessions']);
    }

    createSession(theme: Theme){
        this.router.navigate(['/theme/', theme._id, 'session']);
    }
/*
    getUsers(session: Session) {
        let users = [];
        for (let i = 0; i < session.theme.organisers.length; i++) {
            this.userService.get(session.theme.organisers[i]).subscribe(
                user => {
                    users[i] = user.user;
                },
                err => {
                    console.log(err);
                });
        }
        return users;
    }
    */

    deleteOrganiser(theme: Theme, userId: string){
        this.themeService.deleteOrganiser(theme, userId).subscribe(
            done => {
                this.alertService.sucess("Organiser deleted!", false)
                location.reload();
            },
            err => {
                console.log(err);
            });
    }
    /*
    getOrganisers(theme: Theme) {
        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }

        this.organiserIds = session.theme.organisers;

        if (isInArray(this.userId, this.organiserIds)) {
            this.isOrganiser = true;
            return true;
        } else {
            this.isOrganiser = false;
            return false;
        }
    }
    */

    getOrganiser(userId: string){
        console.log(userId)
        this.userService.get(userId).subscribe(
            user => {
                return user
            },
            err => {
                console.log(err);
            }
        )
    }

    addOrganiser(theme: Theme, email: string) {
        this.themeService.addOrganiser(theme, email)
            .subscribe(
                succes => {
                    this.alertService.success("Organiser added", false);
                    location.reload();
                },
                err => {
                    this.alertService.error(err, false)
                });

    }
}
