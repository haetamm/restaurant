import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { tableApi } from '../api/table.api';

export interface Table {
  id: string;
  name: string;
}

interface TablesState {
  loading: boolean;
  tables: Table[];
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private state = new BehaviorSubject<TablesState>({
    tables: [],
    loading: false,
  });
  state$: Observable<TablesState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchTables(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await tableApi.getTables();
      this.updateState({
        tables: data.data,
        loading: false,
      });
    } catch (error: any) {
      this.updateState({ tables: [], loading: false });
      this.toastService.error(
        error.message || 'Failed to load menu categories',
      );
    }
  }

  getState(): Observable<TablesState> {
    return this.state$;
  }

  getTables(): Table[] | [] {
    return this.state.value.tables;
  }

  private updateState(newState: Partial<TablesState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
