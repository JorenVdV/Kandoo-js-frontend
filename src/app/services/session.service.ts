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

    createSession(title, description, circleType, minCardsPerParticipant, maxCardsPerParticipant, cardsCanBeReviewed, cardsCanBeAdded, themeId, creator, startDate, amountOfCircles, turnDurationInMinutes): Observable<Session> {


        if(startDate == ""){
            startDate = new Date();
        }

        let object = {
            title: title,
            description: description,
            circleType: circleType,
            minCardsPerParticipant: minCardsPerParticipant,
            maxCardsPerParticipant: maxCardsPerParticipant,
            cards: [],
            cardsCanBeReviewed: cardsCanBeReviewed,
            cardsCanBeAdded: cardsCanBeAdded,
            participants: [],
            themeid: themeId,
            creotor: creator,
            callback: "",
            startDate: startDate,
            amountOfCircles: amountOfCircles,
            turnDurationInMinutes: turnDurationInMinutes
        };

        return this.http
            .post(this.sessionUrl+'/theme/'+'58acad839561f00004c6a1f1'+'/sessions',object, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    readSession(id: string): Observable<Session> {
        const url = `${this.sessionUrl}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readSessions(): Observable<Session[]> {
        return this.http
            .get(this.sessionUrl + '/theme/58aed9312ff14c2c14977cff/sessions')
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

    deleteSession(id: string): Observable<Session> {
        const url = `${this.sessionUrl}/${id}`;
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    startSession(id: string){}
}
