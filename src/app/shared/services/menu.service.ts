import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { menuApi } from '../api/menu.api';
import { ModalService } from './modal.service';
import { PaginationResponse } from '../utils/types';

export interface MenuRequest {
  name: string;
  price: number;
  categoryId: string;
  image: File;
}

export interface MenuBulkRequest {
  name: string;
  price: number;
  categoryId: string;
}

export interface MenuUpdateRequest {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image?: any;
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
  categoryId: string;
  image?: any;
}

interface MenusState {
  loading: boolean;
  menus: Menu[];
  menuDetail: Menu | null;
  pagination: PaginationResponse | null;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private state = new BehaviorSubject<MenusState>({
    menus: [],
    menuDetail: null,
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
  private readonly modalService = inject(ModalService);
  private readonly platformId = inject(PLATFORM_ID);

  private showToastSuccess(message: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastService.success(message);
    }
  }

  private showToastError(message: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastService.error(message);
    }
  }

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchMenus(params?: MenuQueryParams): Promise<void> {
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
      this.showToastError(error.message || 'Failed to load menu');
    }
  }

  async createMenuBulk(menus: MenuBulkRequest[]): Promise<void> {
    try {
      const newMenu = await menuApi.createMenuBulk(menus);
      const currentMenus = this.state.value.menus;
      this.updateState({
        menus: [...newMenu, ...currentMenus],
      });
      this.showToastSuccess('Menu berhasil dibuat!');
      this.modalService.hideModal();
    } catch (error: any) {
      this.showToastError(error.message || 'Gagal membuat menu');
      throw error;
    }
  }

  async createMenu(menu: MenuRequest): Promise<void> {
    try {
      const newMenu = await menuApi.createMenu(menu);
      const currentMenus = this.state.value.menus;
      this.updateState({
        menus: [newMenu, ...currentMenus],
      });
      this.showToastSuccess('Menu berhasil dibuat!');
      this.modalService.hideModal();
    } catch (error: any) {
      this.showToastError(error.message || 'Gagal membuat menu');
      throw error;
    }
  }

  async updateMenu(menu: MenuUpdateRequest): Promise<void> {
    try {
      const updatedMenu = await menuApi.updateMenu(menu);
      const currentMenus = this.state.value.menus;
      const updatedMenus = currentMenus.map((m) =>
        m.id === updatedMenu.id ? updatedMenu : m,
      );

      this.updateState({
        menus: updatedMenus,
        menuDetail: null,
      });

      this.showToastSuccess('Menu berhasil diperbarui!');
      this.modalService.hideModal();
    } catch (error: any) {
      this.showToastError(error.message || 'Gagal memperbarui menu');
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
      this.showToastSuccess('Menu berhasil dihapus!');
    } catch (error: any) {
      this.showToastError(error.message || 'Gagal menghapus menu');
    }
  }

  getMenuById(id: string): void {
    const menus = this.state.value.menus;
    const menu = menus.find((menu) => menu.id === id);
    this.updateState({ menuDetail: menu });
  }

  resetMenuDetail(): void {
    this.updateState({ menuDetail: null });
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
