import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from "../models/user";
import {Observable} from "rxjs";
// import current = SyntaxKind.current;

@Injectable()
export class UserService {
    private baseURL = 'https://kandoo-js-backend.herokuapp.com';//'http://localhost:8000';//

    private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });
    constructor(private http: Http) {
    }

    setHeaders(){
      if(!this.headers.has('X-Access-Token'))
      this.headers.set('X-Access-Token', JSON.parse(localStorage.getItem('currentUser_token')));
    }

    getAll() {
      this.setHeaders();
        return this.http.get(this.baseURL + '/users', {headers: this.headers}).map((response: Response) => response.json().users);
    }

    // getById(_id: number) {
    //     return this.http.get('http://api.teamjs.xyz/users/' + _id, this.jwt()).map((response: Response) => response.json());
    // }

    create(user: User) {
        return this.http.post(this.baseURL + '/register', user, {headers: this.headers}).map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('http://api.teamjs.xyz/users/' + user._id, user, this.jwt()).map((response: Response) => response.json());
    // }

    deleteAccount(id: string) {
      this.setHeaders();
        return this.http.delete(this.baseURL + '/user/'+id+'/delete', {headers: this.headers}).map((response: Response) => response.json());
    }

    get(id: string){
      this.setHeaders();
      console.log(this.headers.getAll('X-Access-Token'));
        return this.http.get(this.baseURL + '/user/'+id, {headers: this.headers}).map((response: Response) => response.json());
    }

    /*
    changepwd(id: string, currentPwd: string, newPwd: string): Observable<User> {
        const url = this.baseURL + '/user/' + id + '/update';

        return this.http
            .put(url, JSON.stringify({password: newPwd, originalPassword: currentPwd}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }
*/
    changepwd(id: string, currentPwd: string, newPwd: string): Observable<User> {
      this.setHeaders();
        const url = this.baseURL + '/user/' + id + '/update';
        return this.http
            .put(url, JSON.stringify({password: newPwd, originalPassword: currentPwd}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    updateAccount(user: User, id:string): Observable<User> {
      this.setHeaders();
        const url = this.baseURL + '/user/' + id + '/update';

        return this.http
            .put(url, JSON.stringify({firstname: user.firstname, lastname: user.lastname, emailAddress: user.emailAddress, organisation: user.organisation }), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }


    // private jwt() {
        // create authorization header with jwt token
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser && currentUser.token) {
        //     let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
        //     return new RequestOptions({headers: headers});
        // }
    // }
}
