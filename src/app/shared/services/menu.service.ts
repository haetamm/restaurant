import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { menuApi } from '../api/menu.api';

export interface MenuRequest {
  name: string;
  price: number;
  categoryId: string;
  image: File;
}

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
  price: number;
  category: string;
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

  async createMenu(menu: MenuRequest): Promise<void> {
    try {
      const newMenu = await menuApi.createMenu(menu);
      const currentMenus = this.state.value.menus;
      this.updateState({
        menus: [newMenu, ...currentMenus],
      });
      this.toastService.success('Menu berhasil dibuat!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal membuat menu');
      throw error;
    }
  }

  async updateMenu(menu: Menu): Promise<void> {
    try {
      const updatedMenu = await menuApi.updateMenu(menu);
      const currentMenus = this.state.value.menus;

      const updatedMenus = currentMenus.map((m) =>
        m.id === updatedMenu.id ? updatedMenu : m,
      );

      this.updateState({
        menus: updatedMenus,
      });

      this.toastService.success('Menu berhasil diperbarui!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal memperbarui menu');
    }
  }

  async deleteMenu(id: string): Promise<void> {
    try {
      await menuApi.deleteMenu({ id });
      const currentMenus = this.state.value.menus;
      const updatedMenus = currentMenus.filter((menu) => menu.id !== id);
      this.updateState({
        menus: updatedMenus,
      });
      this.toastService.success('Menu berhasil dihapus!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal menghapus menu');
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
