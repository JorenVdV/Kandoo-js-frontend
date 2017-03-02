import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Theme} from "../models/theme";

@Injectable()
export class ThemeService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private themeUrl = 'http://api.teamjs.xyz/';

    constructor(private http: Http) {
    }

    createTheme(theme: Theme): Observable<Theme> {

        let currentUser = localStorage.getItem('currentUser');


        var tags = [];
        for(var i = 0; i < theme.tags.length; i++){
            tags[i] = theme.tags[i]["display"];
        }
        console.log(tags);
        const themeTags = tags;


        return this.http
            .post(this.themeUrl + 'theme/', JSON.stringify({
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
        const url = `${this.themeUrl+'theme'}/${id}`;
        return this.http
            .get(url)
            .map((res: Response) => res.json().theme)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    readThemes(): Observable<Theme[]> {
        return this.http
            .get(this.themeUrl+'themes/')
            .map((res: Response) => res.json().themes)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTheme(theme: Theme): Observable<Theme> {
        const url = this.themeUrl+'theme/' + theme._id;
        return this.http
            .put(url, theme, {headers: this.headers})
            .map((res: Response) => res.json().themes)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteTheme(id: string): Observable<Theme> {
        const url = this.themeUrl+'theme/' + id + '/delete';
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
