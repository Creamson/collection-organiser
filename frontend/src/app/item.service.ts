import {Injectable, OnInit} from "@angular/core";
import {ITEMS} from "./mock-items";
import {Item} from "./item";
import {Category} from "./category";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {apiPath} from "../assets/constants";
import "rxjs/add/operator/first";
import "rxjs/add/operator/toPromise";


@Injectable()
export class ItemService implements OnInit {

  private id_token: string;
  private decodedJwt: string;
  private response: string;
  private url: string = apiPath + 'collections'
  public requestBody = "";

  constructor(public authHttp: AuthHttp) {
    this.id_token = localStorage.getItem('id_token');
    this.decodedJwt = new JwtHelper().decodeToken(this.id_token);
    this.response = 'nothing received yet';
  }

  getItems(): Promise<Item[]> {
    return Promise.resolve(ITEMS);
  }

  getCategories(): Promise<Category[]> {
    return Promise.resolve(this.authHttp.get(this.url, this.requestBody).toPromise().then(
      response => {

        let categories: Category[] = [];
        for (let entry of response.json()) {
          categories.push(new Category(entry.name));
        }
        return categories;
      }
    ));
  }

  getItemsOfCategory(category: Category): Promise<Item[]> {
    return Promise.resolve(this.authHttp.get(this.url + "/" + category.name, this.requestBody).toPromise().then(
      response => {
        let items: Item[] = [];
        for (let entry of response.json()) {
          //items.push(new Item(entry.name));
          console.log(entry);
        }
        return items;
      }
    ));
  }

  getItem(id: number): Promise<Item> {
    return this.getItems()
      .then(items => items.find(item => item.id === id));
  }

  getCategory(name: string): Promise<Category> {
    return this.getCategories()
      .then(categories => categories.find(category => category.name === name));
  }

  ngOnInit(): void {
  }
}
