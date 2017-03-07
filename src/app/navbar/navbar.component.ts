import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'navbar'
})

export class NavbarComponent implements OnInit {
    private isLoggedIn;
    private isLoggedOut;

    constructor(private authenticationService: AuthenticationService,  private router: Router) {
    }

    logout() {
        this.authenticationService.logout();
    }

    ngOnInit() {
       let currentUser = localStorage.getItem('currentUser');
       if(currentUser != null){
           this.isLoggedIn = true;
           this.isLoggedOut = false;
       } else {
           this.isLoggedIn = false;
           this.isLoggedOut = true;
           this.router.navigate(['']);
       }
    }





}
