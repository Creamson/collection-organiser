import {Category} from './category';

export class Item {
  constructor(name: string, rating: number, todo: boolean, category: Category) {
    this.name = name;
    this.rating = rating;
    this.todo = todo;
    this.category = category;
  }
  name: string;
  rating: number;
  todo: boolean;
  category: Category;
}
