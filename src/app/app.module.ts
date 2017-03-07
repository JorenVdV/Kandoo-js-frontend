import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {ThemeDetailComponent} from "./theme/details/theme-detail.component";
import {AppRouting} from "./routing/app.routing";
import {ThemeService} from "./services/theme.service";
import {AlertComponent} from "./directives/alert.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CardComponent} from "./card/list/card.component";
import {MockBackend} from "@angular/http/testing";
import {CardService} from "./services/card.service";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {AlertService} from "./services/alert.service";
import {AuthGuard} from "./guards/auth.guard";
import {CardDetailComponent} from "./card/details/card-detail.component";
import {SessionService} from "./services/session.service";
import {SessionComponent} from "./session/session.component";
import {GameComponent} from "./game/game.component";
import {ThemeListComponent} from './theme/list/theme-list.component';
import {LandingComponent} from "./landing/landing.component";
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {TagInputModule} from 'ng2-tag-input';
import {NavbarComponent} from "./navbar/navbar.component";
import {ChangePwdComponent} from "./account/change-password.component";
import {ParticipatingSessionComponent} from "./session/list-participating/participating-session.component";

@NgModule({
    declarations: [
        AppComponent,
        ThemeDetailComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        CardComponent,
        CardDetailComponent,
        SessionComponent,
        GameComponent,
        ThemeListComponent,
        LandingComponent,
        NavbarComponent,
        ChangePwdComponent,
        ParticipatingSessionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouting,
        Ng2Bs3ModalModule,
        TagInputModule
    ],
    providers: [
        ThemeService,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CardService,
        MockBackend,
        BaseRequestOptions,
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
