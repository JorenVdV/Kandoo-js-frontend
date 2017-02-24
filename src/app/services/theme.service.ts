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
    return this.http
      .post(this.themeUrl + 'theme/', JSON.stringify({
        title: theme.title,
        description: theme.description,
        tags: theme.tags,
        isPublic: theme.publicAccess
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
      .get(this.themeUrl+'themes')
      .map((res: Response) => res.json().themes)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateTheme(theme: Theme): Observable<Theme> {
    const url = `${this.themeUrl}/${theme._id}`;
    return this.http
      .put(url, JSON.stringify(theme), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteTheme(id: string): Observable<Theme> {
    console.log(id);
    const url = `${this.themeUrl+'theme/' + id +'/delete'}`;
    return this.http
      .delete(this.themeUrl+'theme/' + id +'/delete')
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
