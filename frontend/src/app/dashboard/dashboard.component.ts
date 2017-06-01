import {Component, OnInit} from '@angular/core';
import {ItemService} from "../item.service";
import {Category} from "../category";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  categories: Category[] = [];

  constructor(private itemService: ItemService) { }

  getCategories(): void {
    console.log("o;a");
    this.categories.push(new Category("tu jestem"));
    this.itemService.getCategories()
      .then(categories => this.categories = categories);
    this.categories.push(new Category("BOOKS"));
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
