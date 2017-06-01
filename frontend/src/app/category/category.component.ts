import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

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

  constructor(private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) {}

  getItems(): void {
    this.itemService.getItemsOfCategory(this.category).then(items => this.items = items);
  }

  ngOnInit(): void {
    console.log("jtest");
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
    this.itemService.setItem(item);
    return item.todo;
  }

  deleteItem(item: Item): boolean {
    this.itemService.deleteItem(item).then(items => this.items = items );
    this.selectedItem = null;
    return true;
  }

  saveItem(item: Item): boolean {
    console.log("oooo:" + item.category.name);
    this.itemService.saveItem(item);
    this.getItems();
    this.selectedItem = null;
    return true;
  }
}
