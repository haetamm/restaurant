import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { AdminTableComponent } from '../../components/admin-table/admin-table.component';
import { ButtonBottomComponent } from '../../components/button-bottom/button-bottom.component';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-dashboard-admin-page',
  templateUrl: './dashboard-admin-page.component.html',
  imports: [AdminTableComponent, ButtonBottomComponent, ButtonModule],
})
export class DashboardAdminPageComponent {
  constructor(
    private adminService: AdminService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.adminService.fetchAdmins();
  }

  showAdminFormModal(): void {
    this.adminService.resetAdminDetail();
    this.modalService.showAdminForm();
  }
}
