import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Konstanta untuk tipe modal
export const MODAL_TYPES = {
  LOGOUT: 'logout',
  DELETE: 'delete',
  CART: 'cart',
  BILL_DETAIL: 'billDetail',
  MENU_FORM: 'menuForm',
  MENU_FORM_BULK: 'menuFormBulk',
  CONFIRM_EMAIL_FORM: 'confirmEmailForm',
  CUSTOMER_DETAIL: 'customerDetail',
  CUSTOMER_FORM: 'customerForm',
  USER_DETAIL: 'userDetail',
  USER_ACTIVATE_INACTIVATE: 'userActivateOrInactivate',
  ADMIN_FORM: 'adminForm',
  USER_GOOGLE_FORM: 'userGoogleForm',
} as const;

// Interface untuk state modal
interface ModalState {
  isVisible: boolean;
  type: string;
  callback: (() => void | Promise<void>) | null; // Dukung async callback
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalState$ = new BehaviorSubject<ModalState>({
    isVisible: false,
    type: '',
    callback: null,
    loading: false,
  });

  // 🔁 Fungsi umum untuk menampilkan modal
  private showModal(
    type: string,
    callback: (() => void | Promise<void>) | null = null,
  ): void {
    this.modalState$.next({
      isVisible: true,
      type,
      callback,
      loading: false,
    });
  }

  showLogout(): void {
    this.showModal(MODAL_TYPES.LOGOUT);
  }

  showDelete(callback: () => void | Promise<void>): void {
    this.showModal(MODAL_TYPES.DELETE, callback);
  }

  showCart(): void {
    this.showModal(MODAL_TYPES.CART);
  }

  showBillDetail(): void {
    if (window.innerWidth < 1024) {
      this.showModal(MODAL_TYPES.BILL_DETAIL);
    }
  }

  showCustomerBillDetail(): void {
    this.showModal(MODAL_TYPES.BILL_DETAIL);
  }

  showMenuForm(): void {
    if (window.innerWidth < 1024) {
      this.showModal(MODAL_TYPES.MENU_FORM);
    }
  }

  showMenuFormBulk(): void {
    this.showModal(MODAL_TYPES.MENU_FORM_BULK);
  }

  showConfirmEmailForm(): void {
    this.showModal(MODAL_TYPES.CONFIRM_EMAIL_FORM);
  }

  showCustomerDetail(): void {
    this.showModal(MODAL_TYPES.CUSTOMER_DETAIL);
  }

  showCustomerForm(): void {
    this.showModal(MODAL_TYPES.CUSTOMER_FORM);
  }

  showUserDetail(): void {
    this.showModal(MODAL_TYPES.USER_DETAIL);
  }

  showUserAcitvateOrInactivate(callback: () => void | Promise<void>): void {
    this.showModal(MODAL_TYPES.USER_ACTIVATE_INACTIVATE, callback);
  }

  showAdminForm(): void {
    this.showModal(MODAL_TYPES.ADMIN_FORM);
  }

  showUserGoogleForm(): void {
    this.showModal(MODAL_TYPES.USER_GOOGLE_FORM);
  }

  hideModal(): void {
    this.modalState$.next({
      isVisible: false,
      type: '',
      callback: null,
      loading: false,
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
