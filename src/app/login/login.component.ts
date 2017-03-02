import {Response} from "@angular/http";
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {RegisterComponent} from "../register/register.component"
import {UserService} from "../services/user.service";

@Component({
    templateUrl: 'login.component.html',
    selector: 'login'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    private redirectUrl: string = 'themes';

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService, private userService: UserService) {
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
        // .map(response => response)
            .subscribe(
                (response: Response) => {
                    console.log("Success Response" + response.json());
                    this.loading = false;
                    this.redirect();
                },
                err => {
                    console.log('Error: ' + err);
                });
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private redirect(): void {
        console.log("Redirect function");
        this.router.navigate([this.redirectUrl]); //use the stored url here
    }
}