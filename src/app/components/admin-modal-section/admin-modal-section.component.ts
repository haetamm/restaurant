import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AdminFormComponent } from '../admin-form/admin-form.component';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-modal-section',
  imports: [AdminFormComponent],
  templateUrl: './admin-modal-section.component.html',
})
export class AdminModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();

  private adminService = inject(AdminService);

  closeModal() {
    this.onClose.emit();
    this.adminService.resetAdminDetail();
  }
}
