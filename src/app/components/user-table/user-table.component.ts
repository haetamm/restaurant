// user-table.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { formatDate } from './../../shared/utils/helper';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { UserService } from '../../shared/services/user.service';

interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  username: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

interface Column {
  field: string;
  header: string;
}

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
    IconField,
    InputIcon,
  ],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  users: User[] = [];
  loading: boolean = false;
  searchText: string = '';
  first: number = 0;
  rows: number = 10;
  formatDate = formatDate;
  cols!: Column[];

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getState().subscribe((state) => {
      this.users = state.users;
      this.loading = state.loading;
    });

    this.cols = [
      { field: 'name', header: 'Nama' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'No. Hp.' },
      { field: 'createdAt', header: 'Bergabung' },
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

  viewUser(user: User): void {
    console.log('View user:', user);
    // Implement view logic here
  }

  deleteUser(user: User): void {
    console.log('Delete user:', user);
    // Implement delete logic here
  }
}
