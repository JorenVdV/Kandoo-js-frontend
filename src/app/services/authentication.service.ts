import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    login(emailAddress: string, password: string) {
        return this.http.post('http://api.teamjs.xyz/login', JSON.stringify({
            emailAddress: emailAddress,
            password: password
        }))
            .map((response: Response) => {
                // if (!response) return;

                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                if (response.status == 200)
                    return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
