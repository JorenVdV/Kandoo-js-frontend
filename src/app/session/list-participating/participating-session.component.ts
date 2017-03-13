import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Params, ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";
import {AlertService} from "../../services/alert.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    selector: 'participating-session',
    templateUrl: './participating-session.component.html',
})

export class ParticipatingSessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();
    userId: string;

    @ViewChild('modal')
    modal: ModalComponent;

    constructor(private sessionService: SessionService, private alertService: AlertService,
                private router: Router, private route: ActivatedRoute) {

    }


    selectCards(session: Session) {
        this.router.navigate(['/session', session._id, 'selectcards']);
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
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    selectSession(session: Session) {
        this.router.navigate(['/session', session._id]);
    }

    close() {
        this.modal.close();
    }

    startSession(session: Session) {
        this.sessionService.startSession(session).subscribe(
            done => {
                this.router.navigate(['/session', session._id, 'game']);
            },
            err => {
                this.alertService.error(err, false);
            });
    }


    inviteToSession(session: Session) {
        this.sessionService.inviteToSession(session).subscribe(
            done => {
                this.alertService.success('Invite successful', false);
                let delay = (function () {
                    let timer = 0;
                    return function (callback, ms) {
                        clearTimeout(timer);
                        timer = setTimeout(callback, ms);
                    };
                })();
                delay(function () {
                    document.getElementsByTagName("alert")[0].innerHTML = "";
                }, 600); // end delay
            },
            err => {
                this.alertService.error(err, false);
            });
    }
}
