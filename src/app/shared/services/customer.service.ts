import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from './modal.service';
import { customerApi } from '../api/customer.api';

export interface CustomerRequest {
  name: string;
  phoneNumber: string;
}

export interface CustomerUpdateRequest {
  id: string;
  name: string;
  phoneNumber: string;
  address: string | null;
}

export interface PaginationResponse {
  totalPages: number;
  totalElement: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CustomerQueryParams {
  name?: string;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  member: boolean;
  address: string | null;
}

interface CustomersState {
  loading: boolean;
  customers: Customer[];
  customerDetail: Customer | null;
  pagination: PaginationResponse | null;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private state = new BehaviorSubject<CustomersState>({
    customers: [],
    customerDetail: null,
    loading: false,
    pagination: null,
  });
  state$: Observable<CustomersState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  pagination$: Observable<PaginationResponse | null> = this.state.pipe(
    map((state) => state.pagination),
  );

  private readonly toastService = inject(HotToastService);
  private readonly modalService = inject(ModalService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchCustomers(params?: {
    name?: string;
    direction?: 'asc' | 'desc';
    sortBy?: string;
    page?: number;
    size?: number;
  }): Promise<void> {
    this.updateState({ loading: true });
    try {
      console.log('hallo');

      const data = await customerApi.getCustomers(params);
      this.updateState({
        customers: data.data,
        loading: false,
        pagination: data.paginationResponse,
      });
    } catch (error: any) {
      this.updateState({ customers: [], loading: false, pagination: null });
      this.toastService.error(error.message || 'Failed to load customer');
    }
  }

  async createCustomer(customer: CustomerRequest): Promise<void> {
    try {
      const newCustomer = await customerApi.createCustomer(customer);
      const currentCustomers = this.state.value.customers;
      this.updateState({
        customers: [newCustomer, ...currentCustomers],
      });
      this.toastService.success('Customer berhasil dibuat!');
      this.modalService.hideModal();
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal membuat customer');
      throw error;
    }
  }

  async updateCustomer(customer: CustomerUpdateRequest): Promise<void> {
    try {
      const updatedCustomer = await customerApi.updateCustomer(customer);
      const currentCustomers = this.state.value.customers;
      const updatedCustomers = currentCustomers.map((c) =>
        c.id === updatedCustomer.id ? updatedCustomer : c,
      );

      this.updateState({
        customers: updatedCustomers,
        customerDetail: null,
      });

      this.toastService.success('Customer berhasil diperbarui!');
      this.modalService.hideModal();
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui customer');
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await customerApi.deleteCustomer({ id });
      const currentCustomers = this.state.value.customers;
      const updatedCustomers = currentCustomers.filter(
        (customer) => customer.id !== id,
      );
      this.updateState({
        customers: updatedCustomers,
      });
      this.toastService.success('Customer berhasil dihapus!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal menghapus customer');
    }
  }

  getCustomerById(id: string): void {
    const customers = this.state.value.customers;
    const customer = customers.find((customer) => customer.id === id);
    this.updateState({ customerDetail: customer });
  }

  resetCustomerDetail(): void {
    this.updateState({ customerDetail: null });
  }

  getState(): Observable<CustomersState> {
    return this.state$;
  }

  getCustomers(): Customer[] | null {
    return this.state.value.customers;
  }

  getCustomerDetail(): Customer | null {
    return this.state.value.customerDetail;
  }

  getPagination(): PaginationResponse | null {
    return this.state.value.pagination;
  }

  private updateState(newState: Partial<CustomersState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
