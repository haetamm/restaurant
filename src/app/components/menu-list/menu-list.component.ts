import { Component, inject } from '@angular/core';
import { Menu, MenuService } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { usePreload } from '../../shared/utils/use-preload';
import { CartAdminService } from '../../shared/services/cart-admin.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, NgFor, MenuCardComponent],
  templateUrl: './menu-list.component.html',
})
export class MenuListComponent {
  menus: Menu[] = [];
  loading: boolean = false;
  loadingMenuId: string | null = null;

  private readonly preload = usePreload(false);
  private readonly toastService = inject(HotToastService);

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private cartAdminService: CartAdminService,
  ) {}

  ngOnInit() {
    this.menuService.getState().subscribe((state) => {
      this.menus = state.menus;
      this.loading = state.loading;
    });
  }

  async onAddToCart(menuId: string) {
    this.loadingMenuId = menuId;
    try {
      if (this.preload.isUser()) {
        await this.cartService.updateCart(menuId, 1);
      } else {
        // Cari menu berdasarkan menuId
        const menu = this.menus.find((m) => m.id === menuId);
        if (!menu) {
          this.toastService.error('Menu tidak ditemukan');
          return;
        }
        await this.cartAdminService.updateBillRequest(menu);
      }
    } finally {
      this.loadingMenuId = null;
    }
  }
}
