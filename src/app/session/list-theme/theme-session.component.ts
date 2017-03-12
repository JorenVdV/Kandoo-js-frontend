import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Params, ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";

@Component({
    selector: 'theme-session',
    templateUrl: 'theme-session.component.html',
})

export class ThemeSessionComponent implements OnInit {
    sessions: Session[];
    themeId: string;
    session = new Session();

    constructor(private sessionService: SessionService,
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

    ngOnInit() {
        this.themeId = this.route.snapshot.params['_id'];
        this.sessionService.readThemeSessions(this.themeId)
            .subscribe(sessions => {
                    this.sessions = sessions;
                },
                err => {
                    console.log(err);
                });
        console.log(this.sessions);
    }

    selectSession(session: Session) {
        this.router.navigate(['/session', session._id]);
    }
}
