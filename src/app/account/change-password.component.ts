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
})
export class ChangePwdComponent {
    @ViewChild('modal')
    modal: ModalComponent;

    model = new User();
    loading = false;
    constructor(private userService: UserService) {
    }

    constructor() {
    }

    open() {
        this.modal.open();
    }



    changepwd(currentPwd: string, newPwd: string) {
        this.loading = true;
        let currentUser = localStorage.getItem('currentUser');
        this.userService.changepwd(JSON.parse(currentUser)._id, currentPwd, newPwd)
            .subscribe(
                data => {
                    this.alertService.success('Change of password successful', true);
                    this.router.navigate(['/themes']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
