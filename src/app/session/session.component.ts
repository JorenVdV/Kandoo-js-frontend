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
        alert("ThemeId: " + this.themeId);
        this.session.creator = "58aed9312ff14c2c14977cfe";

        this.sessionService.createSession(this.session, this.themeId).subscribe(
            done => {
                //this.navigateToSessions();
            },
            err => {
                console.log(err);
            });

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
        this.themeId = this.route.snapshot.params['_id'];
        if (this.themeId) {
            this.sessionService.readSessions(this.themeId)
                .subscribe(sessions => {
                        this.sessions = sessions;
                    },
                    err => {
                        console.log(err);
                    });
        }

    }

    selectSession(session: Session) {
        this.router.navigate(['/details', session._id]);
    }
}
