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
  categories: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private state = new BehaviorSubject<CategoriesState>({
    categories: [],
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
        categories: data.data,
        loading: false,
      });
    } catch (error: any) {
      this.updateState({ categories: [], loading: false });
      this.toastService.error(
        error.message || 'Failed to load menu categories',
      );
    }
  }

  getState(): Observable<CategoriesState> {
    return this.state$;
  }

  getCategories(): Category[] | [] {
    return this.state.value.categories;
  }

  private updateState(newState: Partial<CategoriesState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
