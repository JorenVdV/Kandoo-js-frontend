import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Card} from "../models/card";
import {Theme} from "../models/theme";

@Injectable()
export class CardService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private cardUrl = 'http://api.teamjs.xyz/';

    constructor(private http: Http) {
    }

  createCard(theme: Theme, card: Card): Observable<Card> {
    return this.http
      .post(this.cardUrl + '/theme/' + theme.id + '/card', JSON.stringify({
        card
      }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    readCard(id: number): Observable<Card> {
        const url = `${this.cardUrl}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readCards(): Observable<Card[]> {
        return this.http
            .get(this.cardUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCard(Card: Card): Observable<Card> {
        const url = `${this.cardUrl}/${Card.id}`;
        return this.http
            .put(url, JSON.stringify(Card), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteCard(id: number): Observable<Card> {
        const url = `${this.cardUrl}/${id}`;
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
