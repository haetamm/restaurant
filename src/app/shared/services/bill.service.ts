import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { billApi } from '../api/bill.api';
import { ModalService } from './modal.service';
import { CartService } from './cart.service';
import { selectPayment } from '../utils/helper';
import { usePreload } from '../utils/use-preload';
import { CartAdminService } from './cart-admin.service';
import { PaginationResponse } from '../utils/types';

export interface BillRequest {
  menuId: string;
  qty: number;
}

export interface DeliveryBillRequest {
  recipientName: string;
  phone: string;
  deliveryAddress: string;
  billRequest: BillRequest[];
}

export interface DineInBillRequest {
  customerName: string;
  customerPhone: string;
  tableName: string;
  billRequest: BillRequest[];
}

export interface BillDetailResponse {
  id: string;
  menuId: string;
  name: string;
  qty: number;
  price: number;
}

export interface PaymentResponse {
  id: string;
  token: string;
  redirectUrl: string;
  transactionStatus: string;
}

export interface BillResponse {
  id: string;
  recipientName: string;
  phone: string;
  deliveryAddress: string;
  transDate: string;
  customerId: string;
  customerName: string;
  tableName: string | null;
  transType: string;
  billDetails: BillDetailResponse[];
  payment: PaymentResponse;
  totalPayment: number;
}

interface BiillState {
  loading: boolean;
  loadingDetail: boolean;
  bills: BillResponse[];
  pagination: PaginationResponse | null;
  billDetail: BillResponse | null;
}

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private state = new BehaviorSubject<BiillState>({
    loading: false,
    loadingDetail: false,
    bills: [],
    pagination: null,
    billDetail: null,
  });
  state$: Observable<BiillState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  pagination$: Observable<PaginationResponse | null> = this.state.pipe(
    map((state) => state.pagination),
  );

  private readonly toastService = inject(HotToastService);
  private readonly modalService = inject(ModalService);
  private readonly cartService = inject(CartService);
  private readonly cartAdminService = inject(CartAdminService);
  private readonly preload = usePreload(false);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async createDeliveryBill(payload: DeliveryBillRequest): Promise<void> {
    try {
      const bill = await billApi.createDeliverBill(payload);
      this.modalService.hideModal();
      this.cartService.resetCart();
      this.toastService.success('Transaksi berhasil dibuat');
      selectPayment(bill.payment.redirectUrl);
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(error.message || 'Gagal membuat transaksi', {
        autoClose: false,
        dismissible: true,
      });
    }
  }

  async createDineInBill(payload: DineInBillRequest): Promise<void> {
    try {
      const bill = await billApi.createDineInBill(payload);
      this.cartAdminService.resetCart();
      this.toastService.success('Transaksi berhasil dibuat');
      selectPayment(bill.payment.redirectUrl);
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(error.message || 'Gagal membuat transaksi', {
        autoClose: false,
        dismissible: true,
      });
    }
  }

  async fetchBillByCurrentUser(params?: {
    from?: string;
    to?: string;
    customerName?: string;
    menuname?: string;
    transType?: string;
    transactionStatus?: string;
    direction?: 'asc' | 'desc';
    sortBy?: string;
    page?: number;
    size?: number;
  }): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = this.preload.isUser()
        ? await billApi.getBillByCurrentUser(params)
        : await billApi.getBills(params);

      this.updateState({
        bills: data.data,
        loading: false,
        pagination: data.paginationResponse,
      });
    } catch (error: any) {
      this.updateState({ bills: [], loading: false, pagination: null });
      this.toastService.error(error.message || 'Failed to load bills');
    }
  }

  async fetchBillById(id: string): Promise<void> {
    this.updateState({ loadingDetail: true });
    try {
      const data = this.preload.isUser()
        ? await billApi.currentUserGetBillById(id)
        : await billApi.getBillById(id);

      this.updateState({
        billDetail: data.data,
        loadingDetail: false,
      });
    } catch (error: any) {
      this.updateState({
        loadingDetail: false,
        billDetail: null,
      });
      this.toastService.error(error.message || 'Failed to load bill detail');
    }
  }

  getState(): Observable<BiillState> {
    return this.state$;
  }

  getBills(): BillResponse[] | null {
    return this.state.value.bills;
  }

  getBillById(): BillResponse | null {
    return this.state.value.billDetail;
  }

  resetBillDetail(): void {
    this.updateState({ billDetail: null });
  }

  getPagination(): PaginationResponse | null {
    return this.state.value.pagination;
  }

  private updateState(newState: Partial<BiillState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
