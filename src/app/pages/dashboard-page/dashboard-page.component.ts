import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private seoService = inject(SeoService, { optional: true });

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Dashboard | Restaurant',
        description: 'Explore our awesome app!',
        url: 'https://your-app.com/home',
        keywords: 'home, app, angular',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }
  }
}
