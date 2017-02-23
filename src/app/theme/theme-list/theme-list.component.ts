import {Component, OnInit} from '@angular/core';
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
    themes:Theme[];

    constructor(private themeService:ThemeService,
                private route:ActivatedRoute) {
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

    deleteTheme(theme: Theme) {
        this.themeService.deleteTheme(theme.id).subscribe(
            themeObject => {
                this.themes.splice(this.themes.findIndex(t => t.id === theme.id),1);
            },
            err => {
                console.log(err);
            });
    }

}
