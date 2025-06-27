import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import {
  CartAdminService,
  RequestMenu,
} from '../../shared/services/cart-admin.service';
import { ModalService } from '../../shared/services/modal.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-admin-item',
  imports: [CommonModule, InputNumber, ButtonModule, FormsModule],
  templateUrl: './cart-admin-item.component.html',
})
export class CartAdminItemComponent {
  @Input() item!: RequestMenu;

  constructor(
    private cartAdminService: CartAdminService,
    private modalService: ModalService,
  ) {}

  updateQuantity(itemId: string, newQty: number): void {
    this.cartAdminService.updateItemQuantity(itemId, newQty);
  }

  deleteMenuById(menuId: string): void {
    this.modalService.showDelete(async () => {
      this.cartAdminService.deleteItemByMenuId(menuId);
    });
  }
}
