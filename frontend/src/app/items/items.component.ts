import {Component, OnInit} from '@angular/core';
import {Item} from "../item";
import {ItemService} from "../item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit{
  items: Item[];
  selectedItem: Item;

  constructor(
    private router: Router,
    private itemService: ItemService) { }

  getItems(): void{
    this.itemService.getItems().then(items => this.items = items);
  }

  ngOnInit(): void {
    this.getItems();
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  gotoDetail(): void {
    console.log('ZSA detail' + this.selectedItem.category.name);
    this.router.navigate(['/detail', this.selectedItem.name]);
  }

  gotoCategory(): void {
    console.log('ZSA category' + this.selectedItem.category.name);
    this.router.navigate(['/category', this.selectedItem.category.name]);
  }

}
