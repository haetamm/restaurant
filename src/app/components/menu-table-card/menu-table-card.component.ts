import { createImgUrl } from './../../shared/utils/helper';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../shared/services/menu.service';
import { Image } from 'primeng/image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-table-card',
  imports: [Image, CommonModule],
  templateUrl: './menu-table-card.component.html',
})
export class MenuTableCardComponent {
  @Input() menu: Menu | null = null;
  @Output() handleDelete = new EventEmitter<string>();
  @Output() handleUpdate = new EventEmitter<string>();

  createImgUrl = createImgUrl;

  onHandleUpdate() {
    this.handleUpdate.emit(this.menu?.id);
  }

  onHandleDelete() {
    this.handleDelete.emit(this.menu?.id);
  }
}
