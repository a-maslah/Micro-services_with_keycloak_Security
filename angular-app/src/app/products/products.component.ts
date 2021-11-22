import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: product[];

  constructor() {}

  ngOnInit(): void {
    this.products = [
      { id: '1', name: 'Galaxy', price: 112 },
      { id: '2', name: 'Galaxy', price: 112 },
      { id: '3', name: 'Galaxy', price: 112 }
    ];
  }
}

type product = {
  id: String;
  name: String;
  price: Number;
};
