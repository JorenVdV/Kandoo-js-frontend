import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl: 'landing.component.html',
})

export class LandingComponent {


    constructor(private router: Router) {
    }


    navigateToLogin() {
        this.router.navigate(['/login']);
    }

}
