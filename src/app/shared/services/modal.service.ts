import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Konstanta untuk tipe modal
export const MODAL_TYPES = {
  LOGOUT: 'logout',
  DELETE: 'delete',
  CART: 'cart',
  BILL_DETAIL: 'billDetail',
} as const;

// Interface untuk state modal
interface ModalState {
  isVisible: boolean;
  type: string;
  callback: (() => void | Promise<void>) | null; // Dukung async callback
  loading: boolean; // State baru buat loading
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalState$ = new BehaviorSubject<ModalState>({
    isVisible: false,
    type: '',
    callback: null,
    loading: false,
  });

  showLogout(): void {
    this.modalState$.next({
      isVisible: true,
      type: MODAL_TYPES.LOGOUT,
      callback: null,
      loading: false,
    });
  }

  showDelete(callback: () => void | Promise<void>): void {
    this.modalState$.next({
      isVisible: true,
      type: MODAL_TYPES.DELETE,
      callback,
      loading: false,
    });
  }

  showCart(): void {
    this.modalState$.next({
      isVisible: true,
      type: MODAL_TYPES.CART,
      callback: null,
      loading: false,
    });
  }

  showBillDetail(): void {
    if (window.innerWidth < 1024) {
      this.modalState$.next({
        isVisible: true,
        type: MODAL_TYPES.BILL_DETAIL,
        callback: null,
        loading: false,
      });
    }
  }

  hideModal(): void {
    this.modalState$.next({
      isVisible: false,
      type: '',
      callback: null,
      loading: false, // Reset loading pas modal ketutup
    });
  }

  getModalState() {
    return this.modalState$.asObservable();
  }

  async executeCallback(): Promise<void> {
    const callback = this.modalState$.value.callback;
    if (callback) {
      try {
        this.modalState$.next({ ...this.modalState$.value, loading: true });
        await callback();
      } catch (error) {
        console.error('Gagal jalankan callback:', error);
      } finally {
        this.modalState$.next({
          ...this.modalState$.value,
          loading: false,
          isVisible: false,
        });
      }
    }
  }
}
