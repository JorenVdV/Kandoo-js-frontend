import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {SocketService} from "../services/socket.service";
import {Message} from "../models/message";


@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

    currentUserId: string;
    messages: any[];
    sessionId: string;

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router, private socketService: SocketService) {
    }


    getMessages() {
        this.sessionService.getMessages(this.sessionId).subscribe(
            messages => {
                this.messages = messages
            },
            err => {
                console.log(err);
            });
    }
/*
    yourFunction() {
        // do whatever you like here
        this.getMessages();
        setTimeout(yourFunction, 50);
    }

*/
    ngOnInit() {

        this.sessionId = this.route.snapshot.params['_id'];
        this.currentUserId = JSON.parse(localStorage.getItem('currentUser'))._id;


        //this.yourFunction();

        this.getMessages();
    }




    sendMessage(message: string) {
        this.sessionService.addMessage(this.sessionId, message, this.currentUserId).subscribe(
            done => {
                this.getMessages();
            },
            err => {
                console.log(err);
            });
    }
}