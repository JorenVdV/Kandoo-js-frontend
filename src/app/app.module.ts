import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {ThemeComponent} from "./theme/details/theme.component";
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
import {CardDetailComponent} from "./card/card-detail.component";
import {SessionService} from "./services/session.service";
import {SessionComponent} from "./session/session.component";
import {GameComponent} from "./game/game.component";
// import { ThemeListComponent } from './theme/theme-list/theme-list.component';

@NgModule({
    declarations: [
        AppComponent,
        ThemeComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        CardComponent,
        CardDetailComponent,
        SessionComponent,
        GameComponent
        // ThemeListComponent
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
