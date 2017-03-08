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

    inviteToSession(session: Session): Observable<Session> {
        function isObject(obj) {
            return obj === Object(obj);
        }

        var invitees = [];
        for(var i = 0; i < session.invitees.length; i++){
            if(isObject(session.invitees[i])){
                invitees[i] = session.invitees[i]["display"];
            } else {
                invitees[i] = session.invitees[i];
            }
            console.log("Array Element["+i+"]");
            console.log(session.invitees[i]);

        }
        console.log("/n/n session.invitees");
        console.log(session.invitees);

        console.log("/n/n created array");
        console.log(invitees)
        alert(session.invitees[session.invitees.length]);

        const sessionInvitees = invitees;
        const url = 'https://api.teamjs.xyz/session/'+session._id+'/invitees';
        return this.http
            .put(url, JSON.stringify({invitees: sessionInvitees}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSession(session: Session): Observable<Session> {
        var invitees = [];
        invitees[0] = "sander@outlook.com";
        invitees[1] = "nick@outlook.com";
        const inviteesArray = invitees;
        const url = 'https://api.teamjs.xyz/session/58bed29459d1b7000433e6fb/invitees';
        return this.http
            .put(url, JSON.stringify({invitees: inviteesArray}), {headers: this.headers})
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

    readThemeSessions(id: string): Observable<Session[]> {
        return this.http
            .get(this.sessionUrl + 'theme/' + id + '/sessions')
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
