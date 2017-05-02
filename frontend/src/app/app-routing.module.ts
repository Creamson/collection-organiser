import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {ItemsComponent}      from './items/items.component';
import {ItemDetailComponent}  from './item-detail/item-detail.component';
import {CategoryComponent} from "./category/category.component";
import {GoogleLoginComponent} from "./google-login/google-login.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: ItemDetailComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'login', component: GoogleLoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
