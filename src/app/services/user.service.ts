import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User} from "../models/user";

@Injectable()
export class UserService {
    private usersUrl = 'http://api.teamjs.xyz/users/';

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.usersUrl, this.jwt()).map((response: Response) => response.json());
    }

    // getById(_id: number) {
    //     return this.http.get('http://api.teamjs.xyz/users/' + _id, this.jwt()).map((response: Response) => response.json());
    // }

    create(user: User) {
        console.log(user);
        console.log(JSON.stringify(user));
        return this.http.post('http://api.teamjs.xyz/register', user, this.jwt()).map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('http://api.teamjs.xyz/users/' + user._id, user, this.jwt()).map((response: Response) => response.json());
    // }

    delete(id: number) {
        return this.http.delete(this.usersUrl + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
