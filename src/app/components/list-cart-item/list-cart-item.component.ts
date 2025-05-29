import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Cart } from '../../shared/services/cart.service';

@Component({
  selector: 'app-list-cart-item',
  imports: [NgIcon, CommonModule, CartItemComponent],
  templateUrl: './list-cart-item.component.html',
})
export class ListCartItemComponent {
  @Input() state!: {
    carts: Cart[];
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  };
  @Input() isShow!: boolean;

  trackById(index: number, item: Cart): string {
    return item.id;
  }
}
