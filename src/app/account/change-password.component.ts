import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {Response} from "@angular/http";
import {UserService} from "../services/user.service";

@Component({
    templateUrl: './change-password.component.html',
    selector: 'change-pwd'
})
export class ChangePwdComponent {
    @ViewChild('modal')
    modal: ModalComponent;

    model = new User();
    loading = false;

    constructor(private userService: UserService, private alertService: AlertService, private router: Router) {
    }


    open() {
        this.modal.open();
    }


    changepwd(currentPwd: string, newPwd: string, repeatNewPwd: string) {
        this.loading = true;
        let currentUser = localStorage.getItem('currentUser');
        let router = this.router;

        if (repeatNewPwd != newPwd) {
            this.alertService.error("Passwords don't match!");
            this.loading = false;
        } else {
            this.userService.changepwd(JSON.parse(currentUser)._id, currentPwd, newPwd)
                .subscribe(
                    data => {
                        this.alertService.success('Change of password successful', true);
                        let delay = (function () {
                            let timer = 0;
                            return function (callback, ms) {
                                clearTimeout(timer);
                                timer = setTimeout(callback, ms);
                            };
                        })();
                        delay(function () {
                            router.navigate(['/themes']);
                        }, 600); // end delay


                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }

}
