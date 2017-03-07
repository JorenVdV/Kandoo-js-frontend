import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from "../models/user";
import {Observable} from "rxjs";
import current = SyntaxKind.current;

@Injectable()
export class UserService {
    private usersUrl = 'https://api.teamjs.xyz/users/';
    private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' });
    constructor(private http: Http) {
    }

    getAll() {
        return this.http.get(this.usersUrl, this.jwt()).map((response: Response) => response.json().users);
    }

    // getById(_id: number) {
    //     return this.http.get('http://api.teamjs.xyz/users/' + _id, this.jwt()).map((response: Response) => response.json());
    // }

    create(user: User) {
        return this.http.post('https://api.teamjs.xyz/register', user, this.jwt()).map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('http://api.teamjs.xyz/users/' + user._id, user, this.jwt()).map((response: Response) => response.json());
    // }

    delete(id: number) {
        return this.http.delete(this.usersUrl + id, this.jwt()).map((response: Response) => response.json());
    }

    changepwd(id: string, currentPwd: string, newPwd: string): Observable<User> {
        const url = 'https://api.teamjs.xyz/user/' + id + '/update';
        console.log(url);
        console.log(password);
        return this.http
            .put(url, JSON.stringify({password: newPwd, originalPassword: currentPwd}), {headers: this.headers})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // private helper methods


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}
