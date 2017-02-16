import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ThemeComponent} from "./theme.component";
import {ThemeService} from "./theme.service";
import {AppRoutingModule} from "./app-routing.module";
import {ThemeDetailComponent} from "./theme-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    ThemeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
