import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ThemeDetailComponent} from "../theme/details/theme-detail.component";
import {CardComponent} from "../card/card.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../guards/auth.guard";
import {HomeComponent} from "../home/home.component";
import {CardDetailComponent} from "../card/card-detail.component";
import {SessionComponent} from "../session/session.component";
import {GameComponent} from "../game/game.component";
import { ThemeListComponent } from '../theme/list/theme-list.component';

export const routes: Routes = [
    {path: '', redirectTo: '/themes', pathMatch: 'full'},
    {path: 'themes', component: ThemeListComponent},
    {path: 'theme', component: ThemeDetailComponent},
    {path: 'theme/:_id', component: ThemeDetailComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cards', component: CardComponent},
    {path: 'card/:id', component: CardDetailComponent},
    {path: 'sessions', component: SessionComponent},
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
