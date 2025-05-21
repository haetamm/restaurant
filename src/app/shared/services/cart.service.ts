import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { cartApi } from '../api/cart.api';

export interface CartRequest {
  menuRequest: { menuId: string; qty: number }[];
}

export interface Cart {
  id: string;
  menuId: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}

interface CartState {
  loading: boolean;
  carts: Cart[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private state = new BehaviorSubject<CartState>({ loading: false, carts: [] });
  state$: Observable<CartState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchCart(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await cartApi.fetchCart();
      this.updateState({ carts: data, loading: false });
    } catch (error: any) {
      this.updateState({ carts: [], loading: false });
      this.toastService.error(error.message || 'Failed to add to cart');
    }
  }

  async addToCart(data: CartRequest): Promise<void> {
    try {
      const newCartItems = await cartApi.updateCart(data); // Mengembalikan Cart[]
      const currentCarts = this.state.value.carts;

      // Gabungkan item baru dengan state saat ini
      const updatedCarts = [...currentCarts];
      newCartItems.forEach((newItem: Cart) => {
        const existingIndex = updatedCarts.findIndex(
          (item) => item.menuId === newItem.menuId,
        );
        if (existingIndex !== -1) {
          // Item sudah ada: update qty
          updatedCarts[existingIndex] = {
            ...updatedCarts[existingIndex],
            qty: updatedCarts[existingIndex].qty + 1,
          };
        } else {
          // Item baru: tambahkan
          updatedCarts.push(newItem);
        }
      });

      console.log('CartService: Updated carts:', updatedCarts);
      this.updateState({ carts: updatedCarts, loading: false });
      console.log('CartService: State after update:', this.state.value);
      this.toastService.success('Item berhasil ditambahkan ke keranjang!');
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(
        error.message || 'Gagal menambahkan ke keranjang',
      );
    }
  }

  getState(): Observable<CartState> {
    return this.state$;
  }

  getCart(): Cart[] | null {
    return this.state.value.carts;
  }

  private updateState(newState: Partial<CartState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
