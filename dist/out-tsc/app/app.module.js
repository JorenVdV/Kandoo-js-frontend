var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { ThemeComponent } from "./theme/theme.component";
import { ThemeDetailComponent } from "./theme/theme-detail.component";
import { AppRouting } from "./routing/app.routing";
import { ThemeService } from "./services/theme.service";
import { AlertComponent } from "./directives/alert.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CardComponent } from "./card/card.component";
import { MockBackend } from "@angular/http/testing";
import { fakeBackendProvider } from "./helpers/fake-backend";
import { CardService } from "./services/card.service";
import { UserService } from "./services/user.service";
import { AuthenticationService } from "./services/authentication.service";
import { AlertService } from "./services/alert.service";
import { AuthGuard } from "./guards/auth.guard";
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/app.module.js.map