import { categoriesMeta } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorybar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorybar.component.html',
})
export class CategorybarComponent implements OnDestroy {
  categoriesMenu: any[] = [];
  selectedCategory: string = 'all'; // Properti untuk menyimpan kategori aktif
  private queryParamsSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
  ) {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const selectedCategory = params['category'] || 'all';
        this.selectedCategory = selectedCategory;
        this.updateActiveCategory(selectedCategory);
      },
    );
  }

  async ngOnInit(): Promise<void> {
    let apiCategories = this.categoryService.getCategories() || [];
    if (!apiCategories || apiCategories.length === 0) {
      await this.categoryService.fetchCategories();
      apiCategories = this.categoryService.getCategories() || [];
    }

    this.categoriesMenu = [
      categoriesMeta[0], // "Semua"
      ...apiCategories.map((cat) => {
        const match = categoriesMeta.find((meta) => meta.value === cat.name);
        return {
          label: match?.label || cat.name,
          link: match?.link || '/img/default.png',
          value: cat.name,
          active: false,
        };
      }),
    ];

    const selectedCategory =
      this.route.snapshot.queryParams['category'] || 'all';

    this.updateActiveCategory(selectedCategory);
  }

  private updateActiveCategory(selectedCategory: string): void {
    this.categoriesMenu = this.categoriesMenu.map((category) => ({
      ...category,
      active: category.value === selectedCategory,
    }));
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    const queryParams = {
      ...this.route.snapshot.queryParams,
      category: category || 'all',
      page: 1,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.menuService.fetchMenus(queryParams);
      });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
