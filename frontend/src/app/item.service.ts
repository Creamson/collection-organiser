import {EventEmitter, Injectable, OnInit} from "@angular/core";
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
  private url: string = apiPath + 'collections';
  public requestBody = "";
  public categoryEvent: EventEmitter<Category[]> = new EventEmitter();

  constructor(public authHttp: AuthHttp) {
    this.id_token = localStorage.getItem('id_token');
    this.decodedJwt = new JwtHelper().decodeToken(this.id_token);
  }

  getCategories(): Promise<Category[]> {
    return Promise.resolve(this.authHttp.get(this.url, this.requestBody).toPromise().then(
      response => {

        let categories: Category[] = [];
        for (let entry of response.json()) {
          categories.push(new Category(entry.name));
        }
        this.categoryEvent.emit(categories);
        return categories;
      },
      error => {
        console.log(error.text);
        return this.getCategories();
      }
    ));
  }

  addCategory(category: Category): Promise<Category[]> {
    const requestBody = "{ \"name\": \"" + category.name + "\"}";
    return Promise.resolve(this.authHttp.post(this.url, requestBody).toPromise().then(
      response => {
        return this.getCategories();
      },
      error => {
        console.log(error.text);
        return this.getCategories();
      }
    ));
  }

  getItemsOfCategory(category: Category): Promise<Item[]> {
    return Promise.resolve(this.authHttp.get(this.url + "/" + category.name, this.requestBody).toPromise().then(
      response => {
        let items: Item[] = [];
        if (response.json().hasOwnProperty('items')) {
          const json = response.json().items;
          for (let entry of json) {
            console.log(entry);
            items.push(new Item(entry.name, entry.rating as number, entry.todo as boolean, category));
          }
        }
        return items;
      },
      error => {
        console.log(error.text);
        return this.getItemsOfCategory(category);
      }
    ));
  }

  updateItem(item: Item): void {
    const requestBody = "{ \"name\": \"" + item.name + "\", \"todo\": " + item.todo + ", \"rating\": " + item.rating + "}";
    this.authHttp.put(this.url + "/" + item.category.name + "/" + item.name, requestBody).subscribe(
      response => {
        console.log(response.text());
      },
      error => console.log(error.text)
    );
  }

  addItem(item: Item): Promise<Item[]> {
    const requestBody = "{ \"name\": \"" + item.name + "\", \"todo\": " + item.todo + ", \"rating\": " + item.rating + "}";
    return Promise.resolve(this.authHttp.post(this.url + "/" + item.category.name, requestBody).toPromise().then(
      response => {
        console.log(response.text());
        return this.getItemsOfCategory(item.category);
      },
      error => {
        console.log(error.text);
        return this.getItemsOfCategory(item.category);
      }
    ));
  }

  deleteItem(item: Item): Promise<Item[]> {
    const requestBody = "{ \"name\": \"" + item.name + "\", \"todo\": " + item.todo + ", \"rating\": " + item.rating + "}";
    console.log(requestBody);
    return Promise.resolve(this.authHttp.delete(this.url + "/" + item.category.name + "/" + item.name, requestBody).toPromise().then(
      response => {
        return this.getItemsOfCategory(item.category);
      },
      error => {
        console.log(error.text);
        return this.getItemsOfCategory(item.category);
      }
    ));
  }

  deleteCategory(category: Category): Promise<Category[]> {
    const requestBody = "{ \"name\": \"" + category.name + "\ }";
    console.log(requestBody);
    return Promise.resolve(this.authHttp.delete(this.url + "/" + category.name, requestBody).toPromise().then(
      response => {
        console.log(response.text());
        return this.getCategories();
      },
      error => {
        console.log(error.text);
        return this.getCategories();
      }
    ));
  }

  getCategory(name: string): Promise<Category> {
    return this.getCategories()
      .then(categories => categories.find(
        category => category.name === name,
        error => console.log(error.text)
      ));
  }

  ngOnInit(): void {
  }
}
