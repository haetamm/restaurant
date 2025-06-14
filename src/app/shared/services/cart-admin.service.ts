import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Menu } from './menu.service';

export interface RequestMenu {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: any;
}

export interface CartAdmin {
  key: string;
  billRequest: RequestMenu[];
}

export interface CartDB extends DBSchema {
  cart: {
    key: string;
    value: CartAdmin;
  };
}

interface CartAdminState {
  loading: boolean;
  cart: CartAdmin | null;
  totalMenu: number;
  totalQty: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartAdminService {
  private dbPromise: Promise<IDBPDatabase<CartDB>> | null = null;
  private state = new BehaviorSubject<CartAdminState>({
    loading: false,
    cart: null,
    totalMenu: 0,
    totalPrice: 0,
    totalQty: 0,
  });
  state$: Observable<CartAdminState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.dbPromise = openDB<CartDB>('cart-admin-db', 1, {
        upgrade(db) {
          db.createObjectStore('cart', { keyPath: 'key' });
        },
      });
    }
  }

  async fetchCart(): Promise<void> {
    if (!this.dbPromise) return;
    this.updateState({ loading: true });
    try {
      const db = await this.dbPromise;
      const cart = await db.get('cart', 'admin-cart');
      this.updateState({
        cart: cart || null,
        ...this.calculateTotals(cart ? cart.billRequest : []),
        loading: false,
      });
    } catch (error: any) {
      this.updateState({
        cart: null,
        totalQty: 0,
        loading: false,
      });
      this.toastService.error(
        error.message || 'Gagal mengambil data keranjang',
      );
    }
  }

  async updateBillRequest(billRequestItem: Menu): Promise<void> {
    if (!this.dbPromise) return;
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) {
        cart = {
          key: 'admin-cart',
          billRequest: [],
        };
      }

      const existingItemIndex = cart.billRequest.findIndex(
        (item) => item.id === billRequestItem.id,
      );

      if (existingItemIndex !== -1) {
        cart.billRequest[existingItemIndex].price = billRequestItem.price;
        this.toastService.info('Menu telah tersedia dikeranjang!');
      } else {
        const newItem: RequestMenu = {
          id: billRequestItem.id,
          name: billRequestItem.name,
          price: billRequestItem.price,
          qty: 1,
          image: billRequestItem.image,
        };
        cart.billRequest.push(newItem);
        this.toastService.success('Menu berhasil ditambahkan!');
      }

      await db.put('cart', cart);
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui menu');
    }
  }

  async updateItemQuantity(itemId: string, newQty: number): Promise<void> {
    if (!this.dbPromise) return;
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) throw new Error('Keranjang tidak ditemukan');

      const itemIndex = cart.billRequest.findIndex(
        (item) => item.id === itemId,
      );
      if (itemIndex === -1)
        throw new Error('Menu tidak ditemukan di keranjang');

      cart.billRequest[itemIndex].qty = newQty;

      await db.put('cart', cart);
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui jumlah menu');
    }
  }

  async deleteItemByMenuId(itemId: string): Promise<void> {
    if (!this.dbPromise) return;
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) throw new Error('Keranjang tidak ditemukan');

      const itemIndex = cart.billRequest.findIndex(
        (item) => item.id === itemId,
      );
      if (itemIndex === -1)
        throw new Error('Menu tidak ditemukan di keranjang');

      cart.billRequest.splice(itemIndex, 1);

      await db.put('cart', cart);
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal menghapus menu');
    }
  }

  async resetCart(): Promise<void> {
    if (!this.dbPromise) return;
    try {
      const db = await this.dbPromise;
      await db.delete('cart', 'admin-cart');
      this.updateState({
        cart: null,
        totalQty: 0,
        totalMenu: 0,
        totalPrice: 0,
        loading: false,
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mereset keranjang');
    }
  }

  getState(): Observable<CartAdminState> {
    return this.state$;
  }

  getCart(): CartAdmin | null {
    return this.state.value.cart;
  }

  private updateState(newState: Partial<CartAdminState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }

  private calculateTotals(menu: RequestMenu[]) {
    return {
      totalMenu: menu.length,
      totalQty: menu.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: menu.reduce((sum, item) => sum + item.qty * item.price, 0),
    };
  }
}
