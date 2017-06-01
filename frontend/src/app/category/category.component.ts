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
  @Input() category: Category;

  constructor(private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) {}

  getItems(): void {
    this.itemService.getItemsOfCategory(this.category).then(items => this.items = items);
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.itemService.getCategory(params['name']))
      .subscribe(category => {
        this.category = category;
        this.getItems();
      });
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  goBack(): void {
    this.location.back();
  }
}
