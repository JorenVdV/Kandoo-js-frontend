import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ThemeDetailComponent} from "../theme/details/theme-detail.component";
import {CardComponent} from "../card/list/card.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../guards/auth.guard";
import {HomeComponent} from "../home/home.component";
import {CardDetailComponent} from "../card/details/card-detail.component";
import {SessionComponent} from "../session/session.component";
import {GameComponent} from "../game/game.component";
import { ThemeListComponent } from '../theme/list/theme-list.component';
import {LandingComponent} from "../landing/landing.component";
import {ChangePwdComponent} from "../account/change-password.component";
import {ParticipatingSessionComponent} from "../session/list-participating/participating-session.component";
import {ThemeSessionComponent} from "../session/list-theme/theme-session.component";
import {SelectCardComponent} from "../card/select/select.card.component";
import {AccountComponent} from "../account/account.component";

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'themes', component: ThemeListComponent},
    {path: 'theme', component: ThemeDetailComponent},
    {path: 'theme/:_id', component: ThemeDetailComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cards', component: CardComponent},
    {path: 'theme/:_id/cards', component: CardComponent},
    {path: 'card/:_id', component: CardDetailComponent},
    {path: 'session', component: SessionComponent},
    {path: 'theme/:_id/session', component: SessionComponent},
    {path: 'session/:sessionId', component: SessionComponent},
    {path: 'changepwd', component: ChangePwdComponent},
    {path: 'game', component: GameComponent},
    {path: 'participating', component: ParticipatingSessionComponent},
    {path: 'theme/:_id/themesessions', component: ThemeSessionComponent},
    {path: 'session/:_id/selectcards', component: SelectCardComponent},
    {path: 'changeaccount', component: AccountComponent},


    // otherwise redirect to home
    {path: 'full', redirectTo: 'landing'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {
}
