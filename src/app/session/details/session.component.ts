import { Component, OnInit } from '@angular/core';
import {Session} from "../../models/session";
import {SessionService} from "../../services/session.service";

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css'],
    providers: [Session]
})
export class SessionComponent implements OnInit {
  private model: Session;
    
    constructor(session: Session,
                private sessionService: SessionService) {
        this.model = session;
    }

  ngOnInit() {
  }

  startSession(){
    this.sessionService.startSession(this.model.id).subscribe();
  }

  stopSession(){
    this.sessionService.stopSession(this.model.id).subscribe();
  }

}
