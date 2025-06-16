import { Component, inject } from '@angular/core';
import { usePreload } from '../../shared/utils/use-preload';
import { Admin, AdminService } from '../../shared/services/admin.service';
import {
  formatDate,
  getUserIcon,
  getUserIconClass,
  getUserTooltip,
} from '../../shared/utils/helper';
import { Column } from '../../shared/utils/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { UserTableHeaderComponent } from '../user-table-header/user-table-header.component';
import { ModalService } from '../../shared/services/modal.service';
import { AdminTableCardComponent } from '../admin-table-card/admin-table-card.component';

@Component({
  selector: 'app-admin-table',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    TagModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    UserTableHeaderComponent,
    Skeleton,
    AdminTableCardComponent,
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent {
  preload = usePreload(false);
  admins: Admin[] = [];
  loading: boolean = false;
  searchText: string = '';
  first: number = 0;
  rows: number = 10;
  cols!: Column[];

  formatDate = formatDate;
  getUserTooltip = getUserTooltip;
  getUserIcon = getUserIcon;
  getUserIconClass = getUserIconClass;

  private adminService = inject(AdminService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.adminService.getState().subscribe((state) => {
      this.admins = state.admins;
      this.loading = state.loading;
    });

    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'createdAt', header: 'Terdaftar' },
      { field: 'updateAt', header: 'Diperbarui' },
      { field: 'action', header: 'Action' },
    ];
  }

  get filteredAdmins(): Admin[] {
    if (!this.searchText) return this.admins;

    const searchLower = this.searchText.toLowerCase();
    return this.admins.filter(
      (admin) =>
        admin.username.toLowerCase().includes(searchLower) ||
        admin.email.toLowerCase().includes(searchLower),
    );
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  activateOrInactivateUser(id: string): void {
    if (this.IsSuperAdmin) {
      this.adminService.getAdminById(id);
      this.modalService.showUserAcitvateOrInactivate(async () => {
        this.adminService.activateOrInactivateAdmin(id);
      });
    }
  }

  updateAdmin(id: string): void {
    this.adminService.getAdminById(id);
    this.modalService.showAdminForm();
  }

  addAdmin(): void {
    this.adminService.resetAdminDetail();
    this.modalService.showAdminForm();
  }

  get IsSuperAdmin() {
    return this.preload.isSuperAdmin();
  }
}
