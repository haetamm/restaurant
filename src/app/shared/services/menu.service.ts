import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { menuApi } from '../api/menu.api';

export interface PaginationResponse {
  totalPages: number;
  totalElement: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface MenuQueryParams {
  category?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export interface Menu {
  id: string;
  name: string;
  price: string;
  image?: any;
}

interface MenusState {
  loading: boolean;
  menus: Menu[];
  pagination: PaginationResponse | null;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private state = new BehaviorSubject<MenusState>({
    menus: [],
    loading: false,
    pagination: null,
  });
  state$: Observable<MenusState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  pagination$: Observable<PaginationResponse | null> = this.state.pipe(
    map((state) => state.pagination),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchMenus(params?: {
    category?: string;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    direction?: 'asc' | 'desc';
    sortBy?: string;
    page?: number;
    size?: number;
  }): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await menuApi.getMenus(params);
      this.updateState({
        menus: data.data,
        loading: false,
        pagination: data.paginationResponse,
      });
    } catch (error: any) {
      this.updateState({ menus: [], loading: false, pagination: null });
      this.toastService.error(error.message || 'Failed to load menu');
    }
  }

  getState(): Observable<MenusState> {
    return this.state$;
  }

  getMenus(): Menu[] | null {
    return this.state.value.menus;
  }

  getPagination(): PaginationResponse | null {
    return this.state.value.pagination;
  }

  private updateState(newState: Partial<MenusState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
