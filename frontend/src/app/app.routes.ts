import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "app/guards/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {CategoryComponent} from "./category/category.component";
import {ItemsComponent} from "./items/items.component";

export const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: ItemDetailComponent},
  {path: 'category/:name', component: CategoryComponent},
  {path: 'items', component: ItemsComponent},
  {path: '**', component: LoginPageComponent}
];
