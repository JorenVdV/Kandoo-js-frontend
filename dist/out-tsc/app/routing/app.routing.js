var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ThemeComponent } from "../theme/theme.component";
import { ThemeDetailComponent } from "../theme/theme-detail.component";
import { CardComponent } from "../card/card.component";
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";
import { AuthGuard } from "../guards/auth.guard";
import { HomeComponent } from "../home/home.component";
export var routes = [
    { path: '', redirectTo: '/theme', pathMatch: 'full' },
    { path: 'theme', component: ThemeComponent },
    { path: 'theme/:id', component: ThemeDetailComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'card', component: CardComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export var AppRouting = (function () {
    function AppRouting() {
    }
    AppRouting = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRouting);
    return AppRouting;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoe-js-frontend/Kandoe-js-frontend/src/app/routing/app.routing.js.map