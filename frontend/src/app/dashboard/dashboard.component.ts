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
  inputCategory: Category;

  constructor(private itemService: ItemService) { }

  getCategories(): void {
    this.itemService.getCategories()
      .then(categories => {
        this.categories = categories;
        this.inputCategory = new Category("input");
      });
  }

  saveCategory(category: Category): void {
    this.itemService.addCategory(category).then(categories => {
      this.categories = categories;
      this.inputCategory = new Category("input");
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
