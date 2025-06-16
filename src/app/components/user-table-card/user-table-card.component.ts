import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import {
  formatDate,
  getUserIcon,
  getUserIconClass,
} from '../../shared/utils/helper';
import { usePreload } from '../../shared/utils/use-preload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-table-card',
  imports: [CommonModule, ButtonModule],
  templateUrl: './user-table-card.component.html',
  styleUrl: './user-table-card.component.scss',
})
export class UserTableCardComponent {
  @Input() user!: User;
  @Output() view = new EventEmitter<string>();
  @Output() activateOrInactivate = new EventEmitter<string>();

  formatDate = formatDate;
  getUserIcon = getUserIcon;
  getUserIconClass = getUserIconClass;
  preload = usePreload(false);

  viewAdmin(id: string): void {
    this.view.emit(id);
  }

  activateOrInactivateUser(id: string): void {
    this.activateOrInactivate.emit(id);
  }

  get IsSuperAdmin(): boolean {
    return this.preload.isSuperAdmin();
  }
}
