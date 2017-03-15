import {Response} from "@angular/http";
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {socketService} from "../services/socket.service";

@Component({
    templateUrl: 'login.component.html',
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
    providers: [socketService]
})

export class LoginComponent implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;

    model = new User();
    loading = false;
    private redirectUrl: string = 'themes';

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService, private userService: UserService, private socketService: socketService) {
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
            .map(response => response)
            .subscribe(
                (response: Response) => {
                    console.log("Success Response" + response.json());
                    this.socketService.listen().subscribe(data => {
                        console.log(data);
                    });

                    this.socketService.sendMessage('loggedin', response.json().user._id);

                    this.loading = false;
                    this.redirect();
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).error);
                    this.loading = false;
                });
    }

    register(password: string, repeatPwd: string) {
        var numberOfErrors = 0;

        if (this.model.firstname == "" || this.model.firstname == null) {
            this.alertService.error("Firstname can't be empty!");
            numberOfErrors++;
        }

        if (this.model.firstname.length < 3) {
            this.alertService.error("Firstname must be 3 characters at least!");
            numberOfErrors++;
        }

        if (this.model.lastname == "" || this.model.lastname == null) {
            this.alertService.error("Lastname can't be empty!");
            numberOfErrors++;
        }

        if (this.model.lastname.length < 3) {
            this.alertService.error("Lastname must be 3 characters at least!");
            numberOfErrors++;
        }

        if (this.model.emailAddress == "" || this.model.emailAddress == null) {
            this.alertService.error("Email address can't be empty!");
            numberOfErrors++;
        }

        if (password == "" || password == null) {
            this.alertService.error("Password can't be empty!");
            numberOfErrors++;
        }

        if (repeatPwd == "" || repeatPwd == null) {
            this.alertService.error("Repeated password can't be empty!");
            numberOfErrors++;
        }

        if (password != repeatPwd) {
            this.alertService.error("Passwords don't match!");
            numberOfErrors++;
        }

        if (numberOfErrors == 0) {
            this.loading = true;
            this.userService.create(this.model)
                .map(response => response)
                .subscribe(
                    (response: Response) => {
                        this.alertService.success('Registration successful', true);
                        let delay = (function () {
                            let timer = 0;
                            return function (callback, ms) {
                                clearTimeout(timer);
                                timer = setTimeout(callback, ms);
                            };
                        })();
                        delay(function () {
                            router.navigate(['/landing']);
                        }, 600); // end delay
                    },
                    error => {
                        console.log(error);
                        if (error instanceof SyntaxError) {
                            let router = this.router;
                            this.alertService.success('Registration successful', true);
                            let delay = (function () {
                                let timer = 0;
                                return function (callback, ms) {
                                    clearTimeout(timer);
                                    timer = setTimeout(callback, ms);
                                };
                            })();
                            delay(function () {
                                router.navigate(['/landing']);
                            }, 600); // end delay
                        } else {
                            this.alertService.error(error);
                            this.loading = false;
                        }

                    });
        }

    }


    private redirect(): void {
        console.log("Redirect function");
        this.router.navigate([this.redirectUrl]); //use the stored url here
    }
}