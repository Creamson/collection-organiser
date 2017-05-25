import {Injectable} from '@angular/core';
import {ITEMS} from './mock-items';
import {CATEGORIES} from './mock-categories';
import {Item} from './item';
import {Category} from './category';

@Injectable()
export class ItemService {
  getItems(): Promise<Item[]> {
    return Promise.resolve(ITEMS);
  }

  getCategories(): Promise<Category[]> {
    return Promise.resolve(CATEGORIES);
  }

  getItemsOfCategory(category: Category): Promise<Item[]> {
     return this.getItems()
       .then(items => items.filter(item => item.category === category));
  }

  getItem(id: number): Promise<Item> {
    return this.getItems()
      .then(items => items.find(item => item.id === id));
  }

  getCategory(id: number): Promise<Category> {
    return this.getCategories()
      .then(categories => categories.find(category => category.id === id));
  }
}
