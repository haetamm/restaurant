import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { usePreload } from '../../shared/utils/use-preload';
import { CartAdminComponent } from '../../components/cart-admin/cart-admin.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-cart-page',
  imports: [CartComponent, CartAdminComponent, CommonModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  private preload = usePreload(false);

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Cart | Warmakth',
        description: 'Explore our awesome app!',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }
  }

  get isUser() {
    return this.preload.isUser();
  }

  get isAdmin() {
    return this.preload.isAdmin();
  }
}
