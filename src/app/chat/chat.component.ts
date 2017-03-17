import {Component, OnInit} from "@angular/core";
import {Card} from "../models/card";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {SessionService} from "../services/session.service";
import {Session} from "../models/session";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {SocketService} from "../services/socket.service";
import {Message, ChatMessage} from "../models/message";
import {ChatService} from "../services/chat.service";


@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

    messages: any[];
    session: Session;
    currentUserId: string;
    messages: any[];
    sessionId: string;
    user: string;

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router, private socketService: SocketService, private chatService: ChatService) {
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
        this.user = JSON.parse(localStorage.getItem('currentUser')).firstname + ' ' + JSON.parse(localStorage.getItem('currentUser')).lastname;
        this.chatService.setup(this.sessionId);
        this.chatService.messages.subscribe(
            data => this.messages.push(data),
            error => console.log(error)
        );


        //this.yourFunction();

        this.getMessages();
    }


    sendMessage(message: string) {
        this.chatService.sendmessage(new ChatMessage(this.user, message));
    }
}