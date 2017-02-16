import {ThemeService} from "./theme.service";
import {Component, OnInit} from '@angular/core';
import {Theme} from "./theme";
import {Router} from "@angular/router";

@Component({
  selector: 'theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent implements OnInit {
  themes: Theme[];

  constructor(private themeService: ThemeService,
              private router: Router) {
  }

  getThemes(): void {
    this.themeService.readThemes().subscribe(
      themes => {
        this.themes = themes
      },
      err => {
        console.log(err);
      });
  }

  submitTheme(name: string, description: string, tags: string, publicAccess: boolean) {
    if (!name || !description || !tags) {
      return;
    }
    this.themeService.createTheme(name, description, tags, publicAccess).subscribe(
      theme => {
        this.themes.push(theme);
      },
      err => {
        console.log(err);
      });
  }

  deleteTheme(theme: Theme) {
    this.themeService.deleteTheme(theme.id).subscribe(
      themeObject => {
        let index = -1;
        for (let i = 0; i < this.themes.length; i++) {
          if (this.themes[i].id === theme.id) {
            index = i;
            break;
          }
        }
        if (index != -1)
          this.themes.splice(index, 1);
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getThemes();
  }

  selectTheme(theme: Theme) {
    this.router.navigate(['/theme', theme.id]);
  }
}
