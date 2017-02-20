import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ThemeComponent} from "../theme/theme.component";
import {ThemeDetailComponent} from "../theme/theme-detail.component";
import {CardComponent} from "../card/card.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../guards/auth.guard";
import {HomeComponent} from "../home/home.component";
import {CardDetailComponent} from "../card/card-detail.component";

export const routes: Routes = [
    {path: '', redirectTo: '/themes', pathMatch: 'full'},
    {path: 'themes', component: ThemeComponent},
    {path: 'theme/:id', component: ThemeDetailComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cards', component: CardComponent},
    {path: 'card/:id', component: CardDetailComponent},
    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {
}
