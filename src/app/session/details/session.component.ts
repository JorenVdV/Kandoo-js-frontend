import { Component, OnInit } from '@angular/core';
import {Session} from "../../models/session";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  private session: Session;

  constructor() { }

  ngOnInit() {
  }

  startSession(){
    
  }

  stopSession(){

  }

}
