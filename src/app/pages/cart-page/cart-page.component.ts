import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { usePreload } from '../../shared/utils/use-preload';
import { CartAdminComponent } from '../../components/cart-admin/cart-admin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [CartComponent, CartAdminComponent, CommonModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  private preload = usePreload(false);

  get isUser() {
    return this.preload.isUser();
  }

  get isAdmin() {
    return this.preload.isAdmin();
  }
}
