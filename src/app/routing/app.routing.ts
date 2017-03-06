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
    {path: 'sessions', component: SessionComponent},
    {path: 'theme/:_id/sessions', component: SessionComponent},
    {path: 'session/:sessionId', component: SessionComponent},
    {path: 'game', component: GameComponent},
    // otherwise redirect to home
    {path: 'full', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {
}
