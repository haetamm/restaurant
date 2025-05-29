import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cart } from '../../shared/services/cart.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-cart-summary',
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent {
  @Input() isShow!: boolean;
  @Input() state!: {
    carts: Cart[];
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  };

  constructor(private modalService: ModalService) {}

  showModal() {
    if (this.state.totalPrice > 0) this.modalService.showCart();
  }
}
