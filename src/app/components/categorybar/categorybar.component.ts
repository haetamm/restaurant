import { categoriesMeta } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-categorybar',
  standalone: true,
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './categorybar.component.html',
})
export class CategorybarComponent implements OnDestroy {
  categoriesMenu: any[] = [];
  selectedCategory: string = 'all'; // Properti untuk menyimpan kategori aktif
  private queryParamsSubscription: Subscription;
  categorySubscription: Subscription | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
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
    // Berlangganan ke state categories menu
    this.categorySubscription = this.categoryService
      .getState()
      .subscribe((state) => {
        if (state.categories.length > 0) {
          this.categoriesMenu = [
            categoriesMeta[0], // "Semua"
            ...state.categories.map((cat) => {
              const match = categoriesMeta.find(
                (meta) => meta.value === cat.name,
              );
              return {
                label: match?.label || cat.name,
                link: match?.link || '/img/default-food.png',
                value: cat.name,
                active: false,
              };
            }),
          ];

          this.cdr.detectChanges();
        }
      });

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
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
