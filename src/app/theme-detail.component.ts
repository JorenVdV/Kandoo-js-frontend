import {Component, OnInit} from "@angular/core";
import {Theme} from "./theme";
import {ThemeService} from "./theme.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})

export class ThemeDetailComponent implements OnInit {
  theme: Theme;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private location: Location) {
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
    this.location.back();
  }
}
