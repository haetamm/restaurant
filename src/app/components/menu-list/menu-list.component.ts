import { Component } from '@angular/core';
import { Menu, MenuService } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { MenuCardComponent } from '../menu-card/menu-card.component';

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

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.menuService.getState().subscribe((state) => {
      this.menus = state.menus;
      this.loading = state.loading;
    });
  }

  async onAddToCart(menuId: string) {
    this.loadingMenuId = menuId;
    await this.cartService.updateCart(menuId, 1);
    this.loadingMenuId = null;
  }
}
