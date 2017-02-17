import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {ThemeComponent} from "./theme/theme.component";
import {ThemeDetailComponent} from "./theme/theme-detail.component";
import {AppRouting} from "./routing/app.routing";
import {ThemeService} from "./services/theme.service";
import {AlertComponent} from "./directives/alert.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CardComponent} from "./card/card.component";
import {MockBackend} from "@angular/http/testing";
import {CardService} from "./services/card.service";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {AlertService} from "./services/alert.service";
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    ThemeDetailComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    ThemeService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CardService,
    // providers used to create fake backend
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
