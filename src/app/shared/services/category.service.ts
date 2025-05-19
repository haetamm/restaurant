import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { categoryApi } from '../api/category.api';

export interface Category {
  id: string;
  name: string;
}

interface CategoriesState {
  loading: boolean;
  menus: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private state = new BehaviorSubject<CategoriesState>({
    menus: [],
    loading: false,
  });
  state$: Observable<CategoriesState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchCategories(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await categoryApi.getCategories();
      this.updateState({
        menus: data.data,
        loading: false,
      });
    } catch (error: any) {
      this.updateState({ menus: [], loading: false });
      this.toastService.error(error.message || 'Failed to load menu');
    }
  }

  getState(): Observable<CategoriesState> {
    return this.state$;
  }

  getCategories(): Category[] | null {
    return this.state.value.menus;
  }

  private updateState(newState: Partial<CategoriesState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
