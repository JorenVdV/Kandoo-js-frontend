﻿import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: 'register.component.html',
    selector: 'register'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
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
    navigateToLogin() {
        this.router.navigate(['/login']);
    }

}
