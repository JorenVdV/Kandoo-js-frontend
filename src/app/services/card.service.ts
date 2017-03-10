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
    private baseURL = 'https://kandoo-js-backend.herokuapp.com';


    constructor(private http: Http) {
    }

  createCard(description, id): Observable<Card> {
    return this.http
      .post(this.baseURL + 'theme/' + id + '/card', JSON.stringify({
        description
      }), {headers: this.headers})
      .map((res: Response) => res.json().cards)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    readCard(id: number): Observable<Card> {
        const url = `${this.baseURL}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readCards(id: string): Observable<Card[]> {
        return this.http
            .get(this.baseURL + 'theme/' + id + '/cards')
            .map((res: Response) => res.json().cards)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCard(Card: Card): Observable<Card> {
        const url = `${this.baseURL}/${Card._id}`;
        return this.http
            .put(url, JSON.stringify(Card), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  deleteCard(id: string): Observable<Card> {
    const url = this.baseURL + 'card/' + id +'/delete';
    return this.http
      .delete(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
