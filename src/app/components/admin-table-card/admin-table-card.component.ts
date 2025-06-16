import {
  formatDate,
  getUserIcon,
  getUserIconClass,
} from './../../shared/utils/helper';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Admin } from '../../shared/services/admin.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-admin-table-card',
  imports: [CommonModule, ButtonModule],
  templateUrl: './admin-table-card.component.html',
})
export class AdminTableCardComponent {
  @Input() admin!: Admin;
  @Output() update = new EventEmitter<string>();
  @Output() activateOrInactivate = new EventEmitter<string>();

  formatDate = formatDate;
  getUserIcon = getUserIcon;
  getUserIconClass = getUserIconClass;
  preload = usePreload(false);

  get IsSuperAdmin(): boolean {
    return this.preload.isSuperAdmin();
  }

  updateAdmin(id: string): void {
    this.update.emit(id);
  }

  activateOrInactivateUser(id: string): void {
    this.activateOrInactivate.emit(id);
  }
}
