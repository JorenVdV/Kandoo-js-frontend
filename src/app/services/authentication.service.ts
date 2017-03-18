import {Component, Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

import {SocketService} from "./socket.service";
import {ISocketItem} from "../socket-item.model";
import {UserService} from "./user.service";

@Injectable()
@Component({
  providers: [SocketService, UserService]
})
export class AuthenticationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseURL = 'http://localhost:8000';//'https://kandoo-js-backend.herokuapp.com';//
  constructor(private http: Http, private router: Router, private socketService: SocketService, private userService: UserService) {
  }

  login(emailAddress: string, password: string) {

    return this.http.post(this.baseURL + '/login', JSON.stringify({
      emailAddress: emailAddress,
      password: password
    }), {headers: this.headers})
      .map((response: Response) => {
        // if (!response) return;
        let res = response.json();
        localStorage.setItem('currentUser_token', JSON.stringify(res.token));
        let currentUser_token = localStorage.getItem('currentUser_token');
        console.log('Token: ' + currentUser_token);

        this.userService.get(res.userId).subscribe(
          user => {
            localStorage.setItem('currentUser', JSON.stringify(user.user));
            let currentUser = localStorage.getItem('currentUser');
            console.log('CurrentUser: ');
            console.log(JSON.parse(currentUser));
            this.router.navigate(['themes']);
            location.reload();
          },
          err => {
            console.log(err);
          }
        );
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        if (response.status == 200)
          return response;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser_token');
  }
}
