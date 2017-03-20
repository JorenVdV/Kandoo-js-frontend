import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable, ReplaySubject} from "rxjs";

import firebase from 'firebase';

@Injectable()
export class CircleService {
  private _sessionID: string;

  private _circleCardRef: any;
  private _circleCards$: any;

  private _nextPlayerID: string;
  private _circleTurnRef: any;
  private _circleTurn$: any;

  private headers = new Headers({'Content-Type': 'application/json'});
  private baseURL = 'https://kandoo-js-backend.herokuapp.com';

  constructor(public http: Http) {
  }

  setHeaders() {
    if (!this.headers.has('X-Access-Token'))
      this.headers.set('X-Access-Token', JSON.parse(localStorage.getItem('currentUser_token')));
  }

  setup(sessionID: string, nextPlayerID: string) {
    this._sessionID = sessionID;
    //handle card updates
    this._circleCardRef = firebase.database().ref(`circleCard/${sessionID}/turns`);
    this._circleCardRef.on('child_added', this.handleCardUpdate, this);
    this._circleCards$ = new ReplaySubject();

    // handle change of turns
    this._nextPlayerID = nextPlayerID;
    this._circleTurnRef = firebase.database().ref(`circleCard/${sessionID}/current`);
    this._circleTurnRef.on('child_added', this.handleTurnUpdate, this);
    this._circleTurn$ = new ReplaySubject();
  }

  get circleCards() {
    return this._circleCards$;
  }


  get circleTurn() {
    return this._circleTurn$;
  }

  handleCardUpdate(snap) {
    try {
      this._circleCards$.next(snap.val());
    } catch (error) {
      console.log(error);
    }
  }

  handleTurnUpdate(snap) {
    try {
      this._circleTurn$.next(snap.val());
    } catch (error) {
      console.log(error);
    }
  }

  playTurn(cardID: string, userID: string) {
    this.setHeaders();
    const url = this.baseURL + '/session/' + this._sessionID + '/turn';
    this.http.put(url, JSON.stringify({userId: userID, cardId: cardID }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe();

    return this._circleCardRef.push({
      userID: userID,
      cardID: cardID, time: new Date().getTime()
    }).key;
  }

  nextUser() {
    return this._circleTurnRef.push({
      userID: this._nextPlayerID
    }).key;
  }
}
