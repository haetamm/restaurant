import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { bootstrapInfoCircle } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  CartAdmin,
  RequestMenu,
} from '../../shared/services/cart-admin.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CartAdminItemComponent } from '../cart-admin-item/cart-admin-item.component';

@Component({
  selector: 'app-list-cart-admin-item',
  imports: [
    NgIcon,
    CommonModule,
    FormsModule,
    ButtonModule,
    CartAdminItemComponent,
  ],
  templateUrl: './list-cart-admin-item.component.html',
  viewProviders: [
    provideIcons({
      bootstrapInfoCircle,
    }),
  ],
})
export class ListCartAdminItemComponent {
  @Input() state!: {
    cart: CartAdmin | null;
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  };

  trackById(index: number, item: RequestMenu): string {
    return item.id || index.toString();
  }
}
