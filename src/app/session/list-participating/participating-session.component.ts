import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Params, ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";
import {AlertService} from "../../services/alert.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'participating-session',
    templateUrl: './participating-session.component.html',
})

export class ParticipatingSessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();
    userId: string;
    organiserIds: string[];
    organisers: User[];
    isOrganiser: boolean;


    @ViewChild('modal')
    modal: ModalComponent;

    constructor(private sessionService: SessionService, private alertService: AlertService, private userService: UserService, private themeService: ThemeService,
                private router: Router, private route: ActivatedRoute) {
        this.organiserIds = new Array(0);
    }

    /*
     getOrganisers(session: Session){
     this.sessionService.getSessionOrganisers(session).subscribe(
     done => {
     for(var i = 0; i < done.length; i++){
     this.organiserIds[i] = done[i]._id;
     }
     console.log(this.organiserIds);
     this.alertService.success("Session cloned!" ,false)

     },
     err => {
     this.alertService.error(err, false);
     });
     }
     */
    cloneSession(session: Session) {
        this.sessionService.cloneSession(session._id).subscribe(
            done => {
                this.alertService.success("Session cloned!", false)
                location.reload()
            },
            err => {
                this.alertService.error(err, false);
            });
    }

    selectCards(session: Session) {
        this.router.navigate(['/session', session._id, 'selectcards']);
    }

    getOrganisers(session: Session) {
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

    goToSession(session: Session) {
        this.router.navigate(['/session', session._id], 'game');
    }

    close() {
        this.modal.close();
    }

    startSession(session: Session) {
        if (session.pickedCards.length < 2) {
            this.alertService.error("You can't play a game on your own!")
        } else {

        }


        if (session.status == "created") {
            if (session.pickedCards.length < session.participants.length) {
                this.alertService.error("Not everyone selected cards yet!")
            } else {
                this.sessionService.startSession(session).subscribe(
                    done => {
                        this.router.navigate(['/session', session._id, 'game']);
                    },
                    err => {
                        this.alertService.error(err, false);
                    });
            }
        } else {
            this.router.navigate(['/session', session._id, 'game']);
        }

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
