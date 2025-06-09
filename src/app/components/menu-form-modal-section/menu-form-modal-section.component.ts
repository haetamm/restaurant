import { MODAL_TYPES } from './../../shared/services/modal.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { MenuFormComponent } from '../menu-form/menu-form.component';
import { CommonModule } from '@angular/common';
import { MenuFormBulkComponent } from '../menu-form-bulk/menu-form-bulk.component';

@Component({
  selector: 'app-menu-form-modal-section',
  imports: [NgIcon, MenuFormComponent, CommonModule, MenuFormBulkComponent],
  templateUrl: './menu-form-modal-section.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
    }),
  ],
})
export class MenuFormModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();
  @Input() type: string = '';
  MODAL_TYPES = MODAL_TYPES;

  closeModal() {
    this.onClose.emit();
  }
}
