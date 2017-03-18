import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Theme} from '../models/theme';
import {Session} from '../models/session';

@Injectable()
export class ThemeService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseURL = 'https://kandoo-js-backend.herokuapp.com';//'http://localhost:8000';//


    constructor(private http: Http) {
    }
  setHeaders(){
    if(!this.headers.has('X-Access-Token'))
      this.headers.set('X-Access-Token', JSON.parse(localStorage.getItem('currentUser_token')));
  }


    createTheme(theme: Theme): Observable<Theme> {
      this.setHeaders();
        const currentUser = localStorage.getItem('currentUser');


        const tags = [];
        try {
            for (let i = 0; i < theme.tags.length; i++) {
                tags[i] = theme.tags[i]['display'];
            }
        } catch (exception) {
        }

        // console.log(tags);
        const themeTags = tags;


        return this.http
            .post(this.baseURL + '/theme/', JSON.stringify({
                title: theme.title,
                description: theme.description,
                tags: themeTags,
                isPublic: theme.publicAccess,
                organiser: JSON.parse(currentUser)._id
            }), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readTheme(id: string): Observable<Theme> {
      this.setHeaders();
        const url = `${this.baseURL + '/theme'}/${id}`;
        return this.http
            .get(url, {headers: this.headers})
            .map((res: Response) => res.json().theme)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemeSessions(themeId: string): Observable<Theme> {
      this.setHeaders();
        return this.http
            .get(this.baseURL + '/theme/' + themeId + '/sessions', {headers: this.headers})
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemes(): Observable<Theme[]> {
      this.setHeaders();
        const currentUser = localStorage.getItem('currentUser');
        return this.http
            .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/themes', {headers: this.headers})
            .map((res: Response) => res.json().themes)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTheme(theme: Theme): Observable<Theme> {
      this.setHeaders();
        function isObject(obj) {
            return obj === Object(obj);
        }

        const tags = [];
        for (let i = 0; i < theme.tags.length; i++) {
            if (isObject(theme.tags[i])) {
                tags[i] = theme.tags[i]['display'];
            } else {
                tags[i] = theme.tags[i];
            }
        }
        theme.tags = tags;


        const url = this.baseURL + '/theme/' + theme._id + '/update';
        return this.http
            .put(url, theme, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addOrganiser(theme: Theme, email: string): Observable<Theme> {
      this.setHeaders();
        return this.http
            .put(this.baseURL + '/theme/' + theme._id + '/addorganiser', JSON.stringify({organiserEmail: email}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    deleteOrganiser(theme: Theme, userId: string): Observable<Theme> {
      this.setHeaders();
        return this.http
            .put(this.baseURL + '/theme/' + theme._id + '/removeorganiser', JSON.stringify({organiserId: userId}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    deleteTheme(id: string): Observable<Theme> {
      this.setHeaders();
        const url = this.baseURL + '/theme/' + id + '/delete';
        return this.http
            .delete(url, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
