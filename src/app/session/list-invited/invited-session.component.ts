import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Params, ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";
import {AlertService} from "../../services/alert.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    selector: 'invited-session',
    templateUrl: './invited-session.component.html',
})

export class InvitedSessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();
    userId: string;


    constructor(private sessionService: SessionService, private alertService: AlertService,
                private router: Router, private route: ActivatedRoute) {

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

    acceptInvite(session: Session){
        this.sessionService.acceptInvite(session)
            .subscribe(sessions => {
                this.sessions.splice(this.sessions.indexOf(session), 1);
                    this.alertService.success("Session accepted!", false);
                    location.reload();
                },
                err => {
                });
    }

    ngOnInit() {

        this.sessionService.readInvitedSessions()
            .subscribe(sessions => {
                    this.sessions = sessions;
                },
                err => {
                });
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    selectSession(session: Session) {
        this.router.navigate(['/session', session._id]);
    }
}
