import { Component, Input } from '@angular/core';
import { Cart, CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import {
  bootstrapPlusLg,
  bootstrapTrash3,
  bootstrapTrash3Fill,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMinus } from '@ng-icons/heroicons/outline';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, NgIcon],
  templateUrl: './cart-item.component.html',
  viewProviders: [
    provideIcons({
      bootstrapPlusLg,
      bootstrapTrash3,
      heroMinus,
      bootstrapTrash3Fill,
    }),
  ],
})
export class CartItemComponent {
  @Input() item!: Cart;
  @Input() isShow!: boolean;
  loading = false;

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
  ) {}

  async onUpdateCart(menuId: string, qty: number) {
    this.loading = true;
    await this.cartService.updateCart(menuId, qty);
    this.loading = false;
  }

  onDeleteItemCart(menuId: string) {
    this.modalService.showDelete(async () => {
      await this.cartService.deleteItemCart(menuId);
    });
  }
}
