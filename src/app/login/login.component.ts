﻿
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    private redirectUrl: string = 'themes';

    constructor(private router: Router,
                private authenticationService: AuthenticationService
        ,
                private alertService: AlertService) {
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // // get return url from route parameters or default to '/'
        // this.returnUrl = '/home';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.emailAddress, this.model.password)
        // .map(response => response.json())
            .subscribe((response) => {
                console.log("Success Response" + response.json());
                this.loading = false;
                this.redirect();
            });
    }

    private
    redirect(): void {
        console.log("Redirect function");
        this.router.navigate([this.redirectUrl]); //use the stored url here
    }
}
