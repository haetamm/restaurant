import { Component, EventEmitter, Output } from '@angular/core';
import { bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { MenuFormComponent } from '../menu-form/menu-form.component';

@Component({
  selector: 'app-menu-form-modal-section',
  imports: [NgIcon, MenuFormComponent],
  templateUrl: './menu-form-modal-section.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
    }),
  ],
})
export class MenuFormModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }
}
