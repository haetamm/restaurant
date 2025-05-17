import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { menuApi } from '../api/menu.api';

export interface MenuQueryParams {
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
  image?: string;
}

interface MenusState {
  loading: boolean;
  menus: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private state = new BehaviorSubject<MenusState>({
    menus: [],
    loading: false,
  });
  state$: Observable<MenusState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchMenus(params?: {
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
      this.updateState({ menus: data, loading: false });
    } catch (error: any) {
      this.updateState({ menus: [], loading: false });
      this.toastService.error(error.message || 'Failed to load menu');
    }
  }

  getState(): Observable<MenusState> {
    return this.state$;
  }

  getMenus(): Menu[] | null {
    return this.state.value.menus;
  }

  private updateState(newState: Partial<MenusState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
