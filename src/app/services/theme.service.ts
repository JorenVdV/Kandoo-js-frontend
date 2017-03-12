import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Theme} from "../models/theme";

@Injectable()
export class ThemeService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseURL = 'https://kandoo-js-backend.herokuapp.com';


    constructor(private http: Http) {
    }


    createTheme(theme: Theme): Observable<Theme> {
        let currentUser = localStorage.getItem('currentUser');


        var tags = [];
        for (var i = 0; i < theme.tags.length; i++) {
            tags[i] = theme.tags[i]["display"];
        }
        console.log(tags);
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
        const url = `${this.baseURL + '/theme'}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json().theme)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemeSessions(themeId: string): Observable<Theme> {
        return this.http
            .get(this.baseURL + '/theme/' + themeId + '/sessions')
            .map((res: Response) => res.json().sessions)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemes(): Observable<Theme[]> {
        let currentUser = localStorage.getItem('currentUser');
        return this.http
            .get(this.baseURL + '/user/' + JSON.parse(currentUser)._id + '/themes')
            .map((res: Response) => res.json().themes)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTheme(theme: Theme): Observable<Theme> {
        function isObject(obj) {
            return obj === Object(obj);
        }

        var tags = [];
        for (var i = 0; i < theme.tags.length; i++) {
            if (isObject(theme.tags[i])) {
                tags[i] = theme.tags[i]["display"];
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

    deleteTheme(id: string): Observable<Theme> {
        const url = this.baseURL + '/theme/' + id + '/delete';
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
