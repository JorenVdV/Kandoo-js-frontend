/**
 * Created by Sander Van Camp on 20/02/2017.
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Session} from "../models/session";
import {Card} from "../models/card";
import {ThemeService} from "./theme.service";

@Injectable()
export class SessionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseURL = 'https://kandoo-js-backend.herokuapp.com';//'http://localhost:8000';//

  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private themeService: ThemeService) {
  }

  setHeaders() {
    if (!this.headers.has('X-Access-Token'))
      this.headers.set('X-Access-Token', JSON.parse(localStorage.getItem('currentUser_token')));
  }

  createSession(session: Session, themeId: string): Observable<Session> {
    this.setHeaders();
    // if(session.startDate == ""){
    //     startDate = new Date();
    // }

    /*
     for(var i = 0; i < session.invitees.length; i++){
     invitees[i] = session.invitees[i]["display"];
     }
     const sessionInvitees = invitees;

     */
    //console.log(sessionInvitees);
    let currentUser = localStorage.getItem('currentUser');

    if (session.cardsCanBeAdded != true) {
      session.cardsCanBeAdded = false;
    }

    return this.http
      .post(this.baseURL + '/theme/' + themeId + '/session', JSON.stringify(
        {
          title: session.title,
          description: session.description,
          circleType: session.circleType,
          minCardsPerParticipant: session.minCardsPerParticipant,
          maxCardsPerParticipant: session.maxCardsPerParticipant,
          cardsCanBeReviewed: session.cardsCanBeReviewed,
          cardsCanBeAdded: session.cardsCanBeAdded,
          creator: JSON.parse(currentUser)._id

        }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getMessages(id: string): Observable<Session> {
    this.setHeaders();
    return this.http
      .get(this.baseURL + '/session/' + id + '/messages', {headers: this.headers})
      .map((res: Response) => res.json().messages)
      .catch((error: any) => Observable.throw(error))
  }

  readSession(id: string): Observable<Session> {
    this.setHeaders();
    return this.http
      .get(this.baseURL + '/session/' + id, {headers: this.headers})
      .map((res: Response) => res.json().session)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addMessage(sessionId: string, message: string, userId: string): Observable<Session> {
    this.setHeaders();
    return this.http
      .post(this.baseURL + '/session/' + sessionId + '/message', JSON.stringify({
        userId: userId,
        message: message
      }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error));
  }

  readSessions(id: string): Observable<Session[]> {
    this.setHeaders();
    return this.http
      .get(this.baseURL + '/theme/' + id + '/sessions', {headers: this.headers})
      .map((res: Response) => res.json().sessions)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  cloneSession(sessionId: String): Observable<Session> {
    this.setHeaders();
    return this.http
      .post(this.baseURL + '/session/' + sessionId + '/copy', JSON.stringify({userId: JSON.parse(localStorage.getItem('currentUser'))._id}), {headers: this.headers})
      .map((res: Response) => res.json().sessions)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  inviteToSession(session: Session): Observable<Session> {
    this.setHeaders();
    function isObject(obj) {
      return obj === Object(obj);
    }

    let invitees = [];
    for (let i = 0; i < session.invitees.length; i++) {
      if (isObject(session.invitees[i])) {
        invitees[i] = session.invitees[i]["display"];
      } else {
        invitees[i] = session.invitees[i];
      }
    }


    const sessionInvitees = invitees;
    const url = this.baseURL + '/session/' + session._id + '/invitees';
    return this.http
      .put(url, JSON.stringify({invitees: sessionInvitees}), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateSession(session: Session): Observable<Session> {
    this.setHeaders();
    const url = this.baseURL + '/session/' + session._id + '/update';
    return this.http
      .put(url, JSON.stringify({
        title: session.title,
        description: session.description,
        circleType: session.circleType,
        minCardsPerParticipant: session.minCardsPerParticipant,
        maxCardsPerParticipant: session.maxCardsPerParticipant,
        cardsCanBeReviewed: session.cardsCanBeReviewed,
        cardsCanBeAdded: session.cardsCanBeAdded,
      }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateSessionCards(session: Session, cards: Card[], isPersonal: boolean, isOrganiser: boolean): Observable<Session> {
    this.setHeaders();
    let url;
    if (!isPersonal && isOrganiser) {
      url = this.baseURL + '/session/' + session._id + '/update';
      return this.http
        .put(url, JSON.stringify({sessionCards: cards}), {headers: this.headers})
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      url = this.baseURL + '/session/' + session._id + '/pick';
      return this.http
        .put(url, JSON.stringify({
          cards: cards,
          userId: JSON.parse(localStorage.getItem('currentUser'))._id
        }), {headers: this.headers})
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  readParticipantSessions(): Observable<Session> {
    this.setHeaders();
    let currentUser = localStorage.getItem('currentUser');
    return this.http
      .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/sessions/participating', {headers: this.headers})
      .map((res: Response) => res.json().sessions)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  readThemeSessions(id: string): Observable<Session> {
    this.setHeaders();
    return this.http
      .get(this.baseURL + '/theme/' + id + '/sessions', {headers: this.headers})
      .map((res: Response) => res.json().sessions)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteSession(id: string): Observable<Session> {
    this.setHeaders();
    const url = this.baseURL + '/session/' + id + '/delete';
    return this.http
      .delete(url, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSessionOrganisers(session: Session): Observable<Session> {
    this.setHeaders();
    return this.http
      .get(this.baseURL + '/theme/' + session.theme._id, {headers: this.headers})
      .map((res: Response) => res.json().theme.organisers)
      .catch((error: any) => Observable.throw(error));
  }

  historySession(sessionId: string): Observable<Session> {
    this.setHeaders();
    const url = this.baseURL + '/session/' + sessionId + '/history';
    return this.http
      .get(url, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  startSession(session: Session): Observable<Session> {
    this.setHeaders();
    let currentUser = localStorage.getItem('currentUser');
    const url = this.baseURL + '/session/' + session._id + '/start';
    return this.http
      .put(url, JSON.stringify({userId: JSON.parse(currentUser)._id}), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  stopSession(session: Session, userId: string): Observable<Session> {
    this.setHeaders();
    const url = this.baseURL + '/session/' + session._id + '/stop';
    return this.http
      .put(url, JSON.stringify({userId: userId}), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  readInvitedSessions(): Observable<Session> {
    this.setHeaders();
    let currentUser = localStorage.getItem('currentUser');
    return this.http
      .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/sessions/invited', {headers: this.headers})
      .map((res: Response) => res.json().sessions)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  acceptInvite(session: Session): Observable<Session> {
    this.setHeaders();
    let currentUser = localStorage.getItem('currentUser');
    const url = this.baseURL + '/session/' + session._id + '/accept';
    return this.http
      .put(url, JSON.stringify({userId: JSON.parse(currentUser)._id}), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
