import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { AdminTableComponent } from '../../components/admin-table/admin-table.component';
import { ButtonBottomComponent } from '../../components/button-bottom/button-bottom.component';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '../../shared/services/modal.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-dashboard-admin-page',
  templateUrl: './dashboard-admin-page.component.html',
  imports: [AdminTableComponent, ButtonBottomComponent, ButtonModule],
})
export class DashboardAdminPageComponent {
  constructor(
    private adminService: AdminService,
    private modalService: ModalService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Admin | Warmakth',
        description: 'Explore our awesome app!',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }

    this.adminService.fetchAdmins();
  }

  showAdminFormModal(): void {
    this.adminService.resetAdminDetail();
    this.modalService.showAdminForm();
  }
}
