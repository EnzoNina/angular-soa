import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item: any;
  @Output() remove = new EventEmitter<number>();

  removeItem(): void {
    this.remove.emit(this.item.producto.id);
  }
}
