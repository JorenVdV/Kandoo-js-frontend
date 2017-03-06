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
    templateUrl: 'change-password.component.ts',
    selector: 'changepwd',
    encapsulation: ViewEncapsulation.None
})

export class ChangePwdComponent implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;

    loading = false;
    private redirectUrl: string = 'themes';

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService, private userService: UserService) {
    }

    open() {
        this.modal.open();
    }


    changepwd(){
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
}