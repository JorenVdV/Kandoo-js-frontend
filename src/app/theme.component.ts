import {ThemeService} from "./theme.service";
import {Component} from '@angular/core';

@Component({
  selector: 'theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent {
  // constructor(private themeService: ThemeService) {
  // }

  // submit(name: string, description: string, tags: string, publicAccess: boolean) {
  //   if (!name || !description || !tags) {
  //     return;
  //   }
  //   this.themeService.create(name, description, tags, publicAccess);
  // }
}
