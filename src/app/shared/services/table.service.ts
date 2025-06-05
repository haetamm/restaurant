import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { tableApi } from '../api/table.api';

export interface Table {
  id: string;
  name: string;
  isTaken: boolean;
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
      this.toastService.error(error.message || 'Failed to load data table');
    }
  }

  async updateTableStatus(table: Table): Promise<void> {
    try {
      const updatedTable = await tableApi.updateTableById(table);
      const tables = [...this.state.value.tables];
      const index = tables.findIndex((t) => t.id === updatedTable.id);

      if (index !== -1) {
        tables[index] = updatedTable;

        this.updateState({
          tables,
        });
      }

      this.toastService.success('Status meja berhasil diupdate');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mengupdate status meja');
      throw error;
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
