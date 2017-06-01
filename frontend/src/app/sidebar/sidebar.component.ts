import {Component, OnInit} from '@angular/core';
import {ItemService} from "../item.service";
import {Category} from "../category";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  title = 'Collections organiser';
  categories: Category[] = [];
  inputCategory: Category;

  constructor(private itemService: ItemService) {
  }

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
