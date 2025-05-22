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
        totalMenu: data.length,
        totalQty: data.reduce((sum: number, item: Cart) => sum + item.qty, 0),
        totalPrice: data.reduce(
          (sum: number, item: Cart) => sum + item.qty * item.price,
          0,
        ),
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
        totalMenu: updatedCarts.length,
        totalQty: updatedCarts.reduce((sum, item) => sum + item.qty, 0),
        totalPrice: updatedCarts.reduce(
          (sum, item) => sum + item.qty * item.price,
          0,
        ),
        loading: false,
      });
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
