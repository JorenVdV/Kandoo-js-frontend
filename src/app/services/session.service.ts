/**
 * Created by Sander Van Camp on 20/02/2017.
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Session} from "../models/session";
import {Theme} from "../models/theme";

@Injectable()
export class SessionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private sessionUrl = 'http://api.teamjs.xyz';

    constructor(private http: Http) {
    }

    createSession(startdate, theme, title, description, turnDurationInMinutes, cardsCanBeReviewed, cardsCanBeAdded, circleType, minCardsPerParticipant, maxCardsPerParticipant): Observable<Session> {

        var cardsPerParticipant = JSON.stringify(minCardsPerParticipant,maxCardsPerParticipant);

        return this.http
            .post(this.sessionUrl + '/theme/' + '58acad839561f00004c6a1f1' + '/sessions', JSON.stringify({
                title, description, circleType,,
            }), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    readSession(id: number): Observable<Session> {
        const url = `${this.sessionUrl}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readSessions(): Observable<Session[]> {
        return this.http
            .get(this.sessionUrl + '/theme/' + '58acad839561f00004c6a1f1' + '/sessions')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSession(session: Session): Observable<Session> {
        const url = `${this.sessionUrl}/${session.id}`;
        return this.http
            .put(url, JSON.stringify(session), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSession(id: number): Observable<Session> {
        const url = `${this.sessionUrl}/${id}`;
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
