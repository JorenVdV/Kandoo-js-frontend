import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Params, ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";

@Component({
    selector: 'participating-session',
    templateUrl: './participating-session.component.html',
})

export class ParticipatingSessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();

    constructor(private sessionService: SessionService,
                private router: Router, private route: ActivatedRoute) {

    }

    getSessions(): void {
        this.sessionService.readParticipantSessions().subscribe(
            sessions => {
                this.sessions = sessions
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
        let currentUser = localStorage.getItem('currentUser');
        this.sessionService.readParticipantSessions()
            .subscribe(sessions => {
                    this.sessions = sessions;
                },
                err => {
                    console.log(err);
                });
        console.log(this.sessions);
    }

    selectSession(session: Session) {
        this.router.navigate(['/details', session._id]);
    }
}
