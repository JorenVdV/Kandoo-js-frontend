import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Session} from "../models/session";
import {Theme} from "../models/theme";
import {SessionService} from "../services/session.service";

@Component({
    selector: 'session',
    templateUrl: './details.component.html',
})

export class SessionComponent implements OnInit {
    sessions: Session[];

    constructor(private sessionService: SessionService,
                private router: Router) {
    }

    getSessions(): void {
        this.sessionService.readSessions().subscribe(
            sessions => {
                this.sessions = sessions
            },
            err => {
                console.log(err);
            });
    }

    submitSession(startdate: string, theme: Theme, title: string, description: string, turnDurationInMinutes: number, cardsCanBeReviewed: boolean, cardsCanBeAdded: boolean, circleType: string, minCardsPerParticipant: number, maxCardsPerParticipant: number) {
        if (!name || !description) {
            return;
        }
        this.sessionService.createSession(startdate, theme, title,description, turnDurationInMinutes, cardsCanBeReviewed, cardsCanBeAdded, circleType, minCardsPerParticipant, maxCardsPerParticipant).subscribe(
            session => {
                this.sessions.push(session);
            },
            err => {
                console.log(err);
            });
    }

    deleteSession(session: Session) {
        this.sessionService.deleteSession(session.id).subscribe(
            sessionObject => {
                let index = -1;
                for (let i = 0; i < this.sessions.length; i++) {
                    if (this.sessions[i].id === session.id) {
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
        this.getSessions();
    }

    selectSession(session: Session) {
        this.router.navigate(['/details', session.id]);
    }
}
