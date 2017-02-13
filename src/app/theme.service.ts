import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Theme} from "./theme";

@Injectable()
export class ThemeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private themeUrl = 'api/themes';

  constructor(private http: Http) {
  }

  create(name: string, description: string, tags: string, publicAccess: boolean): Promise<Theme> {
    return this.http
      .post(this.themeUrl, JSON.stringify({name: name, description: description, tags: tags, publicAccess: publicAccess}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data);
  }
}
