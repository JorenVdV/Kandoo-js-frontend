import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Theme} from "../models/theme";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'theme-detail',
  templateUrl: './theme-detail.component.html',
})

export class ThemeDetailComponent implements OnInit {
  theme: Theme;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.themeService.readTheme(+params['id']))
      .subscribe(theme => this.theme = theme);
  }

  updateTheme() {
    this.themeService.updateTheme(this.theme).subscribe(
      err => {
        console.log(err);
      });
  }
}
