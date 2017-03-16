/**
 * Created by Sander Van Camp on 16/03/2017.
 */
import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {Response} from "@angular/http";
import {UserService} from "../services/user.service";

@Component({
    templateUrl: './delete.component.html',
    selector: 'delete-acc'
})
export class DeleteAccComponent {
    @ViewChild('modal')
    modal: ModalComponent;

    model = new User();
    loading = false;

    constructor(private userService: UserService, private alertService: AlertService, private router: Router) {
    }


    open() {
        this.modal.open();
    }


    deleteAccount() {
        this.loading = true;
        let currentUser = localStorage.getItem('currentUser');
        let router = this.router;


        this.userService.deleteAccount(JSON.parse(currentUser)._id)
            .subscribe(
                data => {
                    this.alertService.success('Account deleted!', true);
                    localStorage.clear();
                    let delay = (function () {
                        let timer = 0;
                        return function (callback, ms) {
                            clearTimeout(timer);
                            timer = setTimeout(callback, ms);
                        };
                    })();
                    delay(function () {
                        router.navigate(['']);
                    }, 600); // end delay


                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

}
