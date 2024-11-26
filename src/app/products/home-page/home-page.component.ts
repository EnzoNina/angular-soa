import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  products = [
    {
      id: 1,
      name: 'Producto 1',
      price: 19.99,
      image: 'https://via.placeholder.com/250',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 29.99,
      image: 'https://via.placeholder.com/250',
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 39.99,
      image: 'https://via.placeholder.com/250',
    },
    {
      id: 4,
      name: 'Producto 4',
      price: 49.99,
      image: 'https://via.placeholder.com/250',
    },
  ];

  addToCart(product: any) {
    console.log('Producto agregado al carrito:', product);
    // Aquí puedes conectar con tu servicio del carrito.
  }
}
