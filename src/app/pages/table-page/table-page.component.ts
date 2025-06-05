import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Subscription } from 'rxjs';
import { Table, TableService } from '../../shared/services/table.service';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-table-page',
  standalone: true,
  templateUrl: './table-page.component.html',
  imports: [ToggleSwitchModule, FormsModule, CommonModule],
})
export class TablePageComponent implements OnInit, OnDestroy {
  tables: Table[] = [];
  filteredTables: Table[] = [];
  activeFilter: boolean = false;
  private tableSubscription: Subscription | null = null;
  private preload = usePreload(false);

  private tableService = inject(TableService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableSubscription = this.tableService.getState().subscribe((state) => {
      this.tables = state.tables;
      this.filterTables(this.activeFilter);
      this.cdr.detectChanges();
    });

    this.tableService.fetchTables();
  }

  filterTables(isTaken: boolean) {
    this.activeFilter = isTaken;
    this.filteredTables = this.tables
      .filter((table) => table.isTaken === isTaken)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  updateTableStatus(id: string, isTaken: boolean) {
    const existingTable = this.tables.find((t) => t.id === id);
    if (!existingTable) {
      return;
    }

    const payload = {
      id,
      name: existingTable.name,
      isTaken: isTaken,
    };

    if (this.preload.isAdmin()) {
      this.tableService.updateTableStatus(payload).then(() => {
        this.filterTables(this.activeFilter);
      });
    }
  }

  get isUser() {
    return this.preload.isUser();
  }

  ngOnDestroy(): void {
    if (this.tableSubscription) {
      this.tableSubscription.unsubscribe();
    }
  }
}
