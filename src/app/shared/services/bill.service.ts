import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { billApi } from '../api/bill.api';

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

interface BiillState {
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private state = new BehaviorSubject<BiillState>({
    loading: false,
  });
  state$: Observable<BiillState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async createDeliveryBill(payload: DeliveryBillRequest): Promise<void> {
    try {
      const result = await billApi.createDeliverBill(payload);
      if (result?.payment?.redirectUrl) {
        window.open(result.payment.redirectUrl, '_blank');
      } else {
        console.warn('No redirectUrl found in response');
      }
    } catch (error: any) {
      this.updateState({ loading: false });
      this.toastService.error(error.message || 'Gagal membuat transaksi');
    }
  }

  getState(): Observable<BiillState> {
    return this.state$;
  }

  private updateState(newState: Partial<BiillState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
