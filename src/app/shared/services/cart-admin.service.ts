import { inject, Injectable } from '@angular/core';
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
  private dbPromise: Promise<IDBPDatabase<CartDB>>;
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

  constructor() {
    this.dbPromise = openDB<CartDB>('cart-admin-db', 1, {
      upgrade(db) {
        db.createObjectStore('cart', { keyPath: 'key' });
      },
    });
  }

  async fetchCart(): Promise<void> {
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
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) {
        cart = {
          key: 'admin-cart',
          billRequest: [],
        };
      }

      // Cek apakah item dengan id sudah ada
      const existingItemIndex = cart.billRequest.findIndex(
        (item) => item.id === billRequestItem.id,
      );

      // Jika item sudah ada, lanjutkan tanpa perubahan
      if (existingItemIndex !== -1) {
        this.toastService.info('Menu telah tersedia di keranjang!');
        return;
      }

      // Tambahkan item baru dengan qty: 1
      const newItem: RequestMenu = {
        id: billRequestItem.id,
        name: billRequestItem.name,
        price: billRequestItem.price,
        qty: 1,
        image: billRequestItem.image,
      };

      cart.billRequest.push(newItem);

      await db.put('cart', cart);
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });

      this.toastService.success('menu berhasil ditambahkan!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui menu');
    }
  }

  async updateItemQuantity(itemId: string, newQty: number): Promise<void> {
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) {
        throw new Error('Keranjang tidak ditemukan');
      }

      // Cari item berdasarkan id
      const itemIndex = cart.billRequest.findIndex(
        (item) => item.id === itemId,
      );
      if (itemIndex === -1) {
        throw new Error('Menu tidak ditemukan di keranjang');
      }

      // Perbarui qty item
      cart.billRequest[itemIndex].qty = newQty;

      // Simpan perubahan ke IndexedDB
      await db.put('cart', cart);

      // Perbarui state
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui jumlah menu');
    }
  }

  async deleteItemByMenuId(itemId: string): Promise<void> {
    try {
      const db = await this.dbPromise;
      let cart = await db.get('cart', 'admin-cart');

      if (!cart) {
        throw new Error('Keranjang tidak ditemukan');
      }

      // Cari item berdasarkan id
      const itemIndex = cart.billRequest.findIndex(
        (item) => item.id === itemId,
      );
      if (itemIndex === -1) {
        throw new Error('Menu tidak ditemukan di keranjang');
      }

      cart.billRequest.splice(itemIndex, 1);

      await db.put('cart', cart);

      // Perbarui state
      this.updateState({
        cart,
        ...this.calculateTotals(cart.billRequest),
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui jumlah menu');
    }
  }

  async resetCart(): Promise<void> {
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
