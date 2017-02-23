import { Component, OnInit } from '@angular/core';
import {Theme} from "../../models/theme";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CardService} from "../../services/card.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  private model = new Theme();
  private editable = false;

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if(id){
      this.themeService.readTheme(id)
          .subscribe(theme => {
            this.model = theme;
          });
    }else {
      this.model.publicAccess = true;
      this.editable = true;
    }
  }

  saveTheme() {
    //TODO: one method?
    // let method = this.model.id?this.themeService.updateTheme: this.themeService.createTheme;
    // method(this.model).subscribe(
    //     err => {
    //       console.log(err);
    //     });

    if(this.model.id){
      this.themeService.updateTheme(this.model).subscribe(
          done => {
            this.router.navigate(['/themes']);//TODO error
          });
    }else {
      this.themeService.createTheme(this.model).subscribe(
          done => {
            this.router.navigate(['/themes']);
          });
    }
  }

  deleteTheme(){
    this.themeService.deleteTheme(this.model.id).subscribe(
        done => {
          this.router.navigate(['/themes']);
        });
  }
}
