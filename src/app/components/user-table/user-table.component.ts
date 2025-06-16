import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import {
  formatDate,
  getUserIcon,
  getUserIconClass,
  getUserTooltip,
} from './../../shared/utils/helper';
import { User, UserService } from '../../shared/services/user.service';
import { ModalService } from '../../shared/services/modal.service';
import { usePreload } from '../../shared/utils/use-preload';
import { Skeleton } from 'primeng/skeleton';
import { UserTableHeaderComponent } from '../user-table-header/user-table-header.component';
import { Column } from '../../shared/utils/types';
import { UserTableCardComponent } from '../user-table-card/user-table-card.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    TagModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    Skeleton,
    UserTableHeaderComponent,
    UserTableCardComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  preload = usePreload(false);
  users: User[] = [];
  loading: boolean = false;
  searchText: string = '';
  first: number = 0;
  rows: number = 10;
  formatDate = formatDate;
  cols!: Column[];
  getUserTooltip = getUserTooltip;
  getUserIcon = getUserIcon;
  getUserIconClass = getUserIconClass;

  private userService = inject(UserService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.userService.getState().subscribe((state) => {
      this.users = state.users;
      this.loading = state.loading;
    });

    this.cols = [
      { field: 'name', header: 'Nama' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Telpon' },
      { field: 'createdAt', header: 'Terdaftar' },
      { field: 'action', header: 'Action' },
    ];
  }

  get filteredUsers(): User[] {
    if (!this.searchText) return this.users;

    const searchLower = this.searchText.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower),
    );
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  viewUser(id: string): void {
    this.userService.getUserById(id);
    this.modalService.showUserDetail();
  }

  activateOrInactivateUser(id: string): void {
    if (this.IsSuperAdmin) {
      this.userService.getUserById(id);
      this.modalService.showUserAcitvateOrInactivate(async () => {
        this.userService.activateOrInactivateUser(id);
      });
    }
  }

  get IsSuperAdmin() {
    return this.preload.isSuperAdmin();
  }
}
