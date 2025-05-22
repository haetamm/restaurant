import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { cartApi } from '../api/cart.api';

export interface CartRequest {
  menuRequest: { menuId: string; qty: number }[];
}

export interface CartItemRequest {
  items: { menuId: string }[];
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
  totalMenu: number;
  totalQty: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private state = new BehaviorSubject<CartState>({
    loading: false,
    carts: [],
    totalMenu: 0,
    totalPrice: 0,
    totalQty: 0,
  });
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
      this.updateState({
        carts: data,
        ...this.calculateTotals(data),
        loading: false,
      });
    } catch (error: any) {
      this.updateState({
        carts: [],
        totalMenu: 0,
        totalQty: 0,
        totalPrice: 0,
        loading: false,
      });
      this.toastService.error(error.message || 'Failed to add to cart');
    }
  }

  async updateCart(menuId: string, qty: number): Promise<void> {
    try {
      const payload = {
        menuRequest: [
          {
            menuId: menuId,
            qty: qty,
          },
        ],
      };
      const newCartItems = await cartApi.updateCart(payload);
      const currentCarts = this.state.value.carts;

      const updatedCarts = [...currentCarts];
      newCartItems.forEach((newItem: Cart) => {
        const existingIndex = updatedCarts.findIndex(
          (item) => item.menuId === newItem.menuId,
        );
        if (existingIndex !== -1) {
          updatedCarts[existingIndex] = newItem;
        } else {
          updatedCarts.push(newItem);
        }
      });

      this.updateState({
        carts: updatedCarts,
        ...this.calculateTotals(updatedCarts),
        loading: false,
      });
      if (qty > 0) this.toastService.success('Item berhasil ditambahkan!');
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(
        error.message || 'Gagal menambahkan ke keranjang',
      );
    }
  }

  async deleteItemCart(menuId: string): Promise<void> {
    try {
      const payload: CartItemRequest = {
        items: [{ menuId }],
      };
      await cartApi.deleteItemCart(payload);
      const updatedCarts = this.state.value.carts.filter(
        (item) => item.menuId !== menuId,
      );

      this.updateState({
        carts: updatedCarts,
        ...this.calculateTotals(updatedCarts),
        loading: false,
      });

      this.toastService.success('Item berhasil dihapus!');
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(
        error.message || 'Gagal menghapus item dari keranjang',
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

  private calculateTotals(carts: Cart[]) {
    return {
      totalMenu: carts.length,
      totalQty: carts.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: carts.reduce((sum, item) => sum + item.qty * item.price, 0),
    };
  }
}
