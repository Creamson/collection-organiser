import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ItemDetailComponent} from './item-detail/item-detail.component'
import {GoogleLoginComponent} from './google-login/google-login.component';
import {ItemsComponent} from "./items/items.component";
import {ItemService} from "./item.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {CategoryComponent} from "./category/category.component";

@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginComponent,
    ItemDetailComponent,
    ItemsComponent,
    DashboardComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})


export class AppModule {
}
