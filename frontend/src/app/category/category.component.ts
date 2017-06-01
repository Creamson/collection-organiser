import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import "rxjs/add/operator/switchMap";

import {Item} from "../item";
import {ItemService} from "../item.service";
import {Category} from "../category";

@Component({
  selector: 'category-my',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  items: Item[];
  selectedItem: Item;
  inputItem: Item;
  @Input() category: Category;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  getItems(): void {
    this.itemService.getItemsOfCategory(this.category).then(items => this.items = items);
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.itemService.getCategory(params['name']))
      .subscribe(category => {
        this.category = category;
        this.getItems();
        this.inputItem = new Item("", 0, true, this.category);
      });
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  goBack(): void {
    this.location.back();
  }

  saveCheckbox(item: Item): boolean {
    item.todo = !item.todo;
    this.itemService.updateItem(item);
    return item.todo;
  }

  deleteItem(item: Item): boolean {
    this.itemService.deleteItem(item).then(items => {
      this.items = items;
      this.selectedItem = item;
      this.inputItem = new Item("", 0, true, this.category);
    });
    return true;
  }

  saveItem(item: Item): boolean {
    if (item.name != "") {
      this.itemService.addItem(item).then(items => {
        this.items = items;
        this.selectedItem = item;
        this.inputItem = new Item("", 0, true, this.category);
      });
      return true;
    }
  }

  deleteCategory(category: Category) : void {
    this.itemService.deleteCategory(category).then(categories => {
      this.goBack();
      location.reload();
    });
  }
}
