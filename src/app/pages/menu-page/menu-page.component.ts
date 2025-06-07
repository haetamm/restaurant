import { Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import {
  MenuService,
  PaginationResponse,
} from '../../shared/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { MenuTableComponent } from '../../components/menu-table/menu-table.component';
import { ButtonModule } from 'primeng/button';
import { ButtonBottomComponent } from '../../components/button-bottom/button-bottom.component';
import { MenuFormComponent } from '../../components/menu-form/menu-form.component';

@Component({
  selector: 'app-menu-page',
  imports: [
    PaginationComponent,
    SearchbarComponent,
    MenuTableComponent,
    ButtonModule,
    ButtonBottomComponent,
    MenuFormComponent,
  ],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent {
  menuPagination: PaginationResponse | null = null;
  initialSearch: string = '';

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe ke perubahan pagination
    this.menuService.pagination$.subscribe((pagination) => {
      this.menuPagination = pagination;
    });

    // Ambil query parameter dari URL saat ini
    const queryParams = this.route.snapshot.queryParams;

    // Set initialSearch berdasarkan name (jika ada)
    queryParams['name'] || '';

    // Panggil fetchMenus dengan query parameter
    const menus = this.menuService.getMenus();
    if (!menus || menus.length < 10) {
      this.menuService.fetchMenus(queryParams);
    }
  }

  onSearch(searchTerm: string) {
    const trimmedSearch = searchTerm.trim();

    const queryParams = {
      ...this.route.snapshot.queryParams,
      page: 1,
      name: trimmedSearch || '',
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

  fetchMenus(queryParams: any) {
    this.menuService.fetchMenus(queryParams);
  }
}
