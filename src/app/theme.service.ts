import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Theme} from "./theme";
import {Observable} from "rxjs";

@Injectable()
export class ThemeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private themeUrl = 'http://localhost:3000/themes';

  constructor(private http: Http) {
  }

  createTheme(name: string, description: string, tags: string, publicAccess: boolean): Observable<Theme> {
    return this.http
      .post(this.themeUrl, JSON.stringify({
        name: name,
        description: description,
        tags: tags,
        publicAccess: publicAccess
      }), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  readTheme(id: number): Observable<Theme> {
    const url = `${this.themeUrl}/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  readThemes(): Observable<Theme[]> {
    return this.http
      .get(this.themeUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateTheme(theme: Theme): Observable<Theme> {
    const url = `${this.themeUrl}/${theme.id}`;
    return this.http
      .put(url, JSON.stringify(theme), {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteTheme(id: number): Observable<Theme> {
    const url = `${this.themeUrl}/${id}`;
    return this.http
      .delete(url)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
