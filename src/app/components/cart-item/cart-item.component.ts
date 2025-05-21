import { Component, Input } from '@angular/core';
import { createImgUrl } from '../../shared/utils/helper';
import { Cart } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() item!: Cart;

  get imageUrl(): string {
    return createImgUrl(this.item?.image);
  }

  isBlur(): boolean {
    return !this.item.id;
  }
}
