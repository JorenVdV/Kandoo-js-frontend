import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private baseURL = 'https://kandoo-js-backend.herokuapp.com';
    constructor(private http: Http, private router: Router) {
    }

    login(emailAddress: string, password: string) {

        return this.http.post(this.baseURL + '/login', JSON.stringify({
            emailAddress: emailAddress,
            password: password
        }), {headers: this.headers})
            .map((response: Response) => {
                // if (!response) return;

                let user = response.json().user;
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