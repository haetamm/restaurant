import { urlPage } from './../../shared/utils/constans';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { ToggleSidebarComponent } from '../../components/toggle-sidebar/toggle-sidebar.component';
import { CartService } from '../../shared/services/cart.service';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    SidebarComponent,
    SidebarComponent,
    ToggleSidebarComponent,
  ],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit {
  urlPage = urlPage;
  sidebarVisible$!: Observable<boolean>;
  preload = usePreload(false);

  constructor(
    private sidebarService: SidebarService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.sidebarVisible$ = this.sidebarService.getSidebarState();

    const cart = this.cartService.getCart();
    if (!cart || (cart.length === 0 && this.preload.isUser())) {
      this.cartService.fetchCart();
    }
  }
}
