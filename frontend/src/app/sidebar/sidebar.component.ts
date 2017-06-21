import {Component, OnInit} from '@angular/core';
import {ItemService} from "../item.service";
import {Category} from "../category";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  title = 'Collections';
  categories: Category[] = [];
  inputCategory: Category;

  constructor(private itemService: ItemService) {
    this.itemService.categoryEvent.subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategories(): void {
    this.itemService.getCategories()
      .then(categories => {
        this.categories = categories;
        this.inputCategory = new Category("input");
      });
  }

  saveCategory(category: Category): void {
    while (category.name.startsWith(" ")) category.name = category.name.substring(1);
    while (category.name.endsWith(" ")) category.name = category.name.substring(0, category.name.length - 1);
    if (category.name != "") {
      this.itemService.addCategory(category).then(categories => {
        this.inputCategory = new Category("input");
      });
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
