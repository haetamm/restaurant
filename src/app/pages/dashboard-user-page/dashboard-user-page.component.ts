import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-dashboard-user-page',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './dashboard-user-page.component.html',
})
export class DashboardUserPageComponent {
  constructor(
    private userService: UserService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Users | Warmakth',
        description: 'Explore our awesome app!',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }
    this.userService.fetchUsers();
  }
}
