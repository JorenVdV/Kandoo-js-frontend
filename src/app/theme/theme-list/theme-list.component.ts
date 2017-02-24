import {Component, OnInit} from '@angular/core';
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
    private themes: Theme[];

    constructor(private themeService:ThemeService,
                private route:ActivatedRoute,  private router: Router) {
    }

    ngOnInit() {
        this.themeService.readThemes().subscribe(
            themes => {
                this.themes = themes
                console.log(this.themes)
            },
            err => {
                console.log(err);
            });

    }

    deleteTheme(theme: Theme) {
        this.themeService.deleteTheme(theme._id).subscribe(
            themeObject => {
                this.themes.splice(this.themes.findIndex(t => t._id === theme._id),1);
            },
            err => {
                console.log(err);
            });
    }

    addCards(id: string) {
        this.router.navigate(["theme", id, "cards"]);
    }

}
