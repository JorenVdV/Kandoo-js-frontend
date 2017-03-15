/**
 * Created by Sander Van Camp on 20/02/2017.
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Session} from "../models/session";
import {Theme} from "../models/theme";
import {Card} from "../models/card";
import {ThemeService} from "./theme.service";

@Injectable()
export class SessionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseURL = 'http://localhost:8000';

    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private themeService: ThemeService) {
    }

    createSession(session: Session, themeId: string): Observable<Session> {

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

        if(session.cardsCanBeAdded != true){
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


    readSession(id: string): Observable<Session> {
        return this.http
            .get(this.baseURL + '/session/' + id)
            .map((res: Response) => res.json().session)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readSessions(id: string): Observable<Session[]> {
        return this.http
            .get(this.baseURL + '/theme/' + id + '/sessions')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    cloneSession(sessionId: String): Observable<Session[]> {
        return this.http
            .post(this.baseURL + '/session/'+sessionId+'/copy', JSON.stringify({userId: JSON.parse(localStorage.getItem('currentUser'))._id }), {headers: this.headers})
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    inviteToSession(session: Session): Observable<Session> {
        function isObject(obj) {
            return obj === Object(obj);
        }

        let invitees = [];
        for(let i = 0; i < session.invitees.length; i++){
            if(isObject(session.invitees[i])){
                invitees[i] = session.invitees[i]["display"];
            } else {
                invitees[i] = session.invitees[i];
            }
        }


        const sessionInvitees = invitees;
        const url = this.baseURL + '/session/'+session._id+'/invitees';
        return this.http
            .put(url, JSON.stringify({invitees: sessionInvitees}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSession(session: Session): Observable<Session> {
        const url = this.baseURL + '/session/'+session._id +'/update';
        return this.http
            .put(url, JSON.stringify({title: session.title,
                description: session.description,
                circleType: session.circleType,
                minCardsPerParticipant: session.minCardsPerParticipant,
                maxCardsPerParticipant: session.maxCardsPerParticipant,
                cardsCanBeReviewed: session.cardsCanBeReviewed,
                cardsCanBeAdded: session.cardsCanBeAdded,}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSessionCards(session: Session, cards: Card[]): Observable<Session> {
        const url;
        if(session.creator==JSON.parse(localStorage.getItem('currentUser'))._id){
            url = 'https://kandoo-js-backend.herokuapp.com/session/'+session._id +'/update';
            return this.http
                .put(url, JSON.stringify({sessionCards: cards}), {headers: this.headers})
                .map((res: Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        } else {
            url = 'https://kandoo-js-backend.herokuapp.com/session/'+session._id +'/pick';
            return this.http
                .put(url, JSON.stringify({cards: cards, userId:JSON.parse(localStorage.getItem('currentUser'))._id }), {headers: this.headers})
                .map((res: Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

        return this.http
            .put(url, JSON.stringify({sessionCards: cards}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readParticipantSessions(): Observable<Session[]> {
        let currentUser = localStorage.getItem('currentUser');
        return this.http
            .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/sessions/participating')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemeSessions(id: string): Observable<Session[]> {
        return this.http
            .get(this.baseURL + '/theme/' + id + '/sessions')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSession(id: string): Observable<Session> {
        const url = this.baseURL + '/session/' + id + '/delete';
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSessionOrganisers(session: Session): Observable<Session[]> {
        return this.http
            .get(this.baseURL + '/theme/' + session.theme)
            .map((res: Response) => res.json().theme.organisers)
            .catch((error: any) => Observable.throw(error));
    }

    startSession(session: Session): Observable<Session> {
        let currentUser = localStorage.getItem('currentUser');
        const url = this.baseURL + '/session/' + session._id + '/start';
        return this.http
            .put(url, JSON.stringify({userId: JSON.parse(currentUser)._id}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    stopSession(session: Session, userId: string): Observable<Session> {
        const url = this.baseURL + '/session/' + session._id + '/stop';
        return this.http
            .put(url, JSON.stringify({userId: userId}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    playTurn(session: Session, userId: string, cardId: string): Observable<Session> {
        const url = this.baseURL + '/session/' + session._id + '/turn';
        return this.http
            .put(url, JSON.stringify({userId: userId, cardId: cardId}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readInvitedSessions(): Observable<Session[]> {
        let currentUser = localStorage.getItem('currentUser');
        return this.http
            .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/sessions/invited')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    acceptInvite(session: Session): Observable<Session[]> {
        let currentUser = localStorage.getItem('currentUser');
        const url = this.baseURL+'/session/'+session._id +'/accept';
        return this.http
            .put(url, JSON.stringify({userId: JSON.parse(currentUser)._id}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
