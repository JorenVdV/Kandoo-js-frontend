import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ThemeComponent} from "./theme.component";
import {ThemeService} from "./theme.service";
import {AppRoutingModule} from "./app-routing.module";
import {ThemeDetailComponent} from "./theme-detail.component";
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    ThemeDetailComponent,
      AlertComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
      routing
  ],
  providers: [
    ThemeService,
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,

      // providers used to create fake backend
      fakeBackendProvider,
      MockBackend,
      BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
