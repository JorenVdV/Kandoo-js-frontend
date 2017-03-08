import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Session} from "../models/session";
import {Theme} from "../models/theme";
import {SessionService} from "../services/session.service";
import {User} from "../models/user";
import {Params, ActivatedRoute} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    selector: 'invite',
    templateUrl: './invite.component.html',
})

export class InviteComponent implements OnInit {

    @ViewChild('modal')
    modal: ModalComponent;

    session = new Session();


    constructor(private sessionService: SessionService,
                private router: Router, private route: ActivatedRoute) {

    }

    open() {
        this.modal.open();
    }

    inviteToSession(){
        this.sessionService.inviteToSession(this.session).subscribe(
            done => {
                alert("Done")
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
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
