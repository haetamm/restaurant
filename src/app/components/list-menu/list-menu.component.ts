import { Component } from '@angular/core';
import { Menu, MenuService } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { CardMenuComponent } from '../card-menu/card-menu.component';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [CommonModule, NgFor, CardMenuComponent],
  templateUrl: './list-menu.component.html',
})
export class ListMenuComponent {
  menus: Menu[] = [];
  loading: boolean = false;

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
    await this.cartService.updateCart(menuId, 1);
  }
}
