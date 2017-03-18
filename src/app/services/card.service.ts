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
    private baseURL = 'http://localhost:8000';//'https://kandoo-js-backend.herokuapp.com';//


    constructor(private http: Http) {
    }
  setHeaders(){
    if(!this.headers.has('X-Access-Token'))
      this.headers.set('X-Access-Token', JSON.parse(localStorage.getItem('currentUser_token')));
  }

  createCard(description, id): Observable<Card> {
    this.setHeaders();
    return this.http
      .post(this.baseURL + '/theme/' + id + '/card', JSON.stringify({
        description
      }), {headers: this.headers})
      .map((res: Response) => res.json().card)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    readCard(id: number): Observable<Card> {
      this.setHeaders();
        const url = `${this.baseURL}/${id}`;
        return this.http
            .get(url, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readCards(id: string): Observable<Card[]> {
      this.setHeaders();
        return this.http
            .get(this.baseURL + '/theme/' + id + '/cards', {headers: this.headers})
            .map((res: Response) => res.json().cards)
            .catch((error: any) => Observable.throw(error));
    }

    updateCard(Card: Card): Observable<Card> {
      this.setHeaders();
        const url = `${this.baseURL}/${Card._id}`;
        return this.http
            .put(url, JSON.stringify(Card), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  deleteCard(id: string): Observable<Card> {
    this.setHeaders();
    const url = this.baseURL + '/card/' + id +'/delete';
    return this.http
      .delete(url, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
