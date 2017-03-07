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

@Injectable()
export class SessionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private sessionUrl = 'https://api.teamjs.xyz/';
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http) {
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

        return this.http
            .post(this.sessionUrl + 'theme/' + themeId + '/session', JSON.stringify(
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
            .get('https://api.teamjs.xyz/session/' + id)
            .map((res: Response) => res.json().session)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readSessions(id: string): Observable<Session[]> {
        return this.http
            .get(this.sessionUrl + 'theme/' + id + '/sessions')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSession(session: Session): Observable<Session> {
        const url = `${this.sessionUrl}/${session._id}`;
        return this.http
            .put(url, JSON.stringify(session), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readParticipantSessions(): Observable<Session[]> {
        let currentUser = localStorage.getItem('currentUser');
        return this.http
            .get(this.sessionUrl + 'user/' + JSON.parse(currentUser)._id + '/sessions/participating')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSession(id: string): Observable<Session> {
        const url = `${this.sessionUrl}/${id}`;
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    startSession(id: string) {
    }
}
