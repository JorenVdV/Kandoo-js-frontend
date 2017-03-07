import {Response} from "@angular/http";
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {RegisterComponent} from "../register/register.component"
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    templateUrl: 'login.component.html',
    selector: 'login',
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;

    model = new User();
    loading = false;
    private redirectUrl: string = 'themes';

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService, private userService: UserService) {
    }

    open() {
        this.modal.open();
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

    register(password: string, repeatPwd: string) {
        var numberOfErrors = 0;

        if(this.model.firstname == "" || this.model.firstname == null){
            this.alertService.error("Firstname can't be empty!");
            numberOfErrors++;
        }

        if(this.model.lastname == "" || this.model.lastname == null){
            this.alertService.error("Lastname can't be empty!");
            numberOfErrors++;
        }

        if(this.model.emailAddress == "" || this.model.emailAddress == null){
            this.alertService.error("Email address can't be empty!");
            numberOfErrors++;
        }

        if(password == "" || password == null){
            this.alertService.error("Password can't be empty!");
            numberOfErrors++;
        }

        if(repeatPwd == "" || repeatPwd == null){
            this.alertService.error("Repeated password can't be empty!");
            numberOfErrors++;
        }

       if (password != repeatPwd) {
            this.alertService.error("Passwords don't match!");
            numberOfErrors++;
        }

        if(numberOfErrors == 0) {
            this.loading = true;
            this.userService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                        alert("Registration succesfull!")
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }

    }


    private redirect(): void {
        console.log("Redirect function");
        this.router.navigate([this.redirectUrl]); //use the stored url here
    }
}