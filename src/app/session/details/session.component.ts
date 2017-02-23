import { Component, OnInit } from '@angular/core';
import {Session} from "../../models/session";

@Component({
  selector: 'app-session',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
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
