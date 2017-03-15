import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Session} from "../models/session";
import {Theme} from "../models/theme";
import {SessionService} from "../services/session.service";
import {User} from "../models/user";
import {Params, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'session',
    templateUrl: './session.component.html',
})

export class SessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();
    id: string;
    sessionLoaded: boolean;
    userId: string;
    isOrganiser: boolean;

    constructor(private sessionService: SessionService,
                private router: Router, private route: ActivatedRoute) {

    }

    getSessions(): void {
        this.sessionService.readSessions(this.themeId).subscribe(
            sessions => {
                this.sessions = sessions
            },
            err => {
                console.log(err);
            });
    }

    saveSession() {
        if (this.session._id) {
            this.sessionService.updateSession(this.session).subscribe(
                done => {
                    this.router.navigate(['/themes']);
                },
                err => {
                    console.log(err);
                });
        } else {
            this.sessionService.createSession(this.session, this.themeId).subscribe(
                done => {
                    this.router.navigate(['/themes']);
                },
                err => {
                    console.log(err);
                });
        }





    }

    deleteSession(session: Session) {
        this.sessionService.deleteSession(session._id).subscribe(
            sessionObject => {
                let index = -1;
                for (let i = 0; i < this.sessions.length; i++) {
                    if (this.sessions[i]._id === session._id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    this.sessions.splice(index, 1);
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.themeId = this.route.snapshot.params['_id'];
        this.id = this.route.snapshot.params['sessionId'];
        if (this.themeId) {
            this.sessionService.readSessions(this.themeId)
                .subscribe(sessions => {
                        this.sessions = sessions;

                    },
                    err => {
                        console.log(err);
                    });
        }
        if (this.id) {
            this.sessionLoaded = true;
            this.sessionService.readSession(this.id)
                .subscribe(s => {
                    console.log(s);
                        this.session = s;
                    },
                    err => {
                        console.log(err);
                    });
            console.log(this.session)
        } else {
            this.sessionLoaded = false;
        }

    }

    selectSession(session: Session) {
        this.router.navigate(['/details', session._id]);
    }
}
