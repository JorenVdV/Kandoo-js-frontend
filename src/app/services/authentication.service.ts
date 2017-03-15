import {Component, Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

import {SocketService} from "./socket.service";
import {ISocketItem} from "../socket-item.model";

@Injectable()
@Component({
    providers: [SocketService]
})
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseURL = 'http://localhost:8000';

    constructor(private http: Http, private router: Router, private socketService: SocketService) {
    }

    login(emailAddress: string, password: string) {

        return this.http.post(this.baseURL + '/login', JSON.stringify({
            emailAddress: emailAddress,
            password: password
        }), {headers: this.headers})
            .map((response: Response) => {
                // if (!response) return;
                let user = response.json().user;



                this.socketService.init(user._id);

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                let currentUser = localStorage.getItem('currentUser');
                this.router.navigate(['themes']);
                location.reload();
                if (response.status == 200)
                    return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}