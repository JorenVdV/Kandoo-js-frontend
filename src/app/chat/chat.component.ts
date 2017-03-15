import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";
import {UserService} from "../services/user.service";


@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

    activeUsers: User[];
    session: Session;
    user: User[];

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    ngOnInit() {
        this.sessionId = this.route.snapshot.params['_id'];


        this.sessionService.readSession(this.sessionId)
            .subscribe(s => {
                    this.session = s;
                },
                err => {
                    console.log(err);
                });

    }
}