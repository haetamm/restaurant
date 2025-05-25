import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  bootstrapInfoCircle,
  bootstrapThreeDots,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CartService, Cart } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ListCartItemComponent } from '../list-cart-item/list-cart-item.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIcon, CommonModule, ListCartItemComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  viewProviders: [
    provideIcons({
      bootstrapThreeDots,
      bootstrapInfoCircle,
    }),
  ],
})
export class CartComponent implements OnInit {
  cartState$!: Observable<{
    carts: Cart[];
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  }>;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cartState$ = this.cartService.getState().pipe(
      tap((state) => {
        this.cdr.detectChanges();
      }),
    );
  }

  trackById(index: number, item: Cart): string {
    return item.id; // Optimasi *ngFor
  }
}
