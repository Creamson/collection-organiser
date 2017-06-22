import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "app/guards/auth.guard";
import {CategoryComponent} from "./category/category.component";

export const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'category/:name', component: CategoryComponent},
  {path: '**', component: LoginPageComponent}
];
