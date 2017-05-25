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
    this.itemService.getCategories()
      .then(categories => this.categories = categories);
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
