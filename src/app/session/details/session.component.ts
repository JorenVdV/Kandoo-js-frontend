import {Component, OnInit} from '@angular/core';
import {Session} from "../../models/session";

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css'],
    providers: [Session]
})
export class SessionComponent implements OnInit {
    private model: Session;

    constructor(session: Session) {
        this.model = session;
    }

    ngOnInit() {
    }

    startSession() {

    }

    stopSession() {

    }

}
