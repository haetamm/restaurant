import { Component, EventEmitter, Output } from '@angular/core';
import { BillDetailCardComponent } from '../bill-detail-card/bill-detail-card.component';
import { bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-bill-detail-modal-section',
  imports: [BillDetailCardComponent, NgIcon],
  templateUrl: './bill-detail-modal-section.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
    }),
  ],
})
export class BillDetailModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }
}
