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
    try {
      // Prepare the payload according to CartRequest
      const payload = {
        menuRequest: [
          {
            menuId: menuId,
            qty: 1, // Default quantity to 1; adjust as needed
          },
        ],
      };
      await this.cartService.addToCart(payload); // Call CartService to add item
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  }
}
