import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'theme-list',
    templateUrl: 'theme-list.component.html',
})

export class ThemeListComponent implements OnInit {
    themes: Theme[];

    constructor(private themeService: ThemeService,
                private router: Router) {
    }

    ngOnInit() {
        this.themeService.readThemes().subscribe(
            themes => {
                this.themes = themes
            },
            err => {
                console.log(err);
            });
    }

    selectTheme(theme: Theme) {
        this.router.navigate(['/theme/', theme._id]);
    }

    createTheme() {
        this.router.navigate(['/theme']);
    }

    deleteTheme(theme: Theme) {
        this.themeService.deleteTheme(theme._id).subscribe(
            done => {
                //this.themes.splice(t => t._id === theme._id, 1);
            },
            err => {
                console.log(err);
            });
    }
}
