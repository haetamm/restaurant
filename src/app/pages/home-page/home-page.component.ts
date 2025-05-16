import { Component, inject } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CategorybarComponent } from '../../components/categorybar/categorybar.component';
import { ListMenuComponent } from '../../components/list-menu/list-menu.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    SearchbarComponent,
    CategorybarComponent,
    ListMenuComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
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
