import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Item} from "../item";
import {ItemService} from "../item.service";

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent implements OnInit{
  @Input() item: Item;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.itemService.getItem(params['name']))
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }
}
