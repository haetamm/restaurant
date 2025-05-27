import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CategorybarComponent } from '../../components/categorybar/categorybar.component';
import { ListMenuComponent } from '../../components/list-menu/list-menu.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  MenuService,
  PaginationResponse,
} from '../../shared/services/menu.service';
import { take } from 'rxjs/operators';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CartComponent } from '../../components/cart/cart.component';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    CategorybarComponent,
    ListMenuComponent,
    RouterModule,
    PaginationComponent,
    CartComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  initialSearch: string = '';
  preload = usePreload(false);
  menuPagination: PaginationResponse | null = null;

  constructor(
    private seoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.menuService.pagination$.subscribe((pagination) => {
      this.menuPagination = pagination;
    });

    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Dashboard | Restaurant',
        description: 'Explore our awesome app!',
        url: 'https://your-app.com/home',
        keywords: 'home, app, angular',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      const nameParam = params['name'];
      this.initialSearch = nameParam && nameParam !== 'all' ? nameParam : '';

      if (Object.keys(params).length === 0) {
        const defaultParams = {
          category: 'all',
          name: 'all',
          minPrice: 0,
          maxPrice: 100000000,
          sortBy: 'name',
          direction: 'asc',
          page: 1,
          size: 10,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: defaultParams,
        });
      }
      const menus = this.menuService.getMenus();
      if (!menus || menus.length === 0) {
        this.menuService.fetchMenus(params);
      }
    });
  }

  onSearch(searchTerm: string) {
    const trimmedSearch = searchTerm.trim();
    const queryParams = {
      ...this.route.snapshot.queryParams, // Pertahankan parameter lain
      name: trimmedSearch || 'all',
      page: 1, // Reset ke halaman 1
    };

    // Navigasi ke URL dengan query parameter baru
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // Gabungkan dengan parameter lain
      })
      .then(() => {
        this.menuService.fetchMenus(queryParams);
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }

  get isUser(): boolean {
    return this.preload.isUser();
  }

  fetchMenus(queryParams: any) {
    this.menuService.fetchMenus(queryParams);
  }
}
