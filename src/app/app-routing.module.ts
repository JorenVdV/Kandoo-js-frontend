import {Routes, RouterModule} from "@angular/router";
import {ThemeComponent} from "./theme.component";
import {NgModule} from "@angular/core";
import {ThemeDetailComponent} from "./theme-detail.component";

export const routes:Routes = [
  {path: '', redirectTo: '/theme', pathMatch: 'full'},
  {path: 'theme', component: ThemeComponent},
  {path: 'theme/:id', component: ThemeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
