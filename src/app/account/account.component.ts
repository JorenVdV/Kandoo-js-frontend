import {Component, ViewChild, OnInit} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {Response} from "@angular/http";
import {UserService} from "../services/user.service";

@Component({
    templateUrl: 'account.component.html',
    selector: 'change-account'
})
export class AccountComponent implements OnInit {

    model = new User();
    loading = false;
    currentUser;

    constructor(private userService: UserService, private alertService: AlertService, private router: Router) {
    }

    updateAccount(user: User) {
        const routerConst = this.router;
        this.userService.updateAccount(user, JSON.parse(this.currentUser)._id)
            .subscribe(
                data => {
                    this.alertService.success('Change of account successful', true);
                    localStorage.clear();
                    localStorage.setItem('currentUser', JSON.stringify(this.model));
                    this.model =  JSON.parse(localStorage.getItem('currentUser'))._id;
                    let delay = (function () {
                        let timer = 0;
                        return function (callback, ms) {
                            clearTimeout(timer);
                            timer = setTimeout(callback, ms);
                        };
                    })();
                    delay(function () {
                        routerConst.navigate(['/themes']);
                    }, 600); // end delay


                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.currentUser = localStorage.getItem('currentUser');
        this.model = JSON.parse(this.currentUser);

    }
}
