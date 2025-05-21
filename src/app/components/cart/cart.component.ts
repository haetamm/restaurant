import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { bootstrapThreeDots } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CartService, Cart } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIcon, CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  viewProviders: [
    provideIcons({
      bootstrapThreeDots,
    }),
  ],
})
export class CartComponent implements OnInit {
  cartState$!: Observable<{ carts: Cart[]; loading: boolean }>;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cartState$ = this.cartService.getState().pipe(
      tap((state) => {
        console.log('CartComponent: Received state:', state);
        this.cdr.detectChanges(); // Paksa change detection
      }),
    );
    // Tidak panggil fetchCart karena sudah dipanggil di home page
  }

  trackById(index: number, item: Cart): string {
    return item.id; // Optimasi *ngFor
  }
}
