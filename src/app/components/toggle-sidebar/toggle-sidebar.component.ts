import { urlPage } from './../../shared/utils/constans';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapFilterRight,
  bootstrapHandbag,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { CartService } from '../../shared/services/cart.service';
import { RouterModule } from '@angular/router';
import { CartAdminService } from '../../shared/services/cart-admin.service';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-toggle-sidebar',
  imports: [CommonModule, NgIcon, RouterModule],
  templateUrl: './toggle-sidebar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
      bootstrapFilterRight,
      bootstrapHandbag,
    }),
  ],
})
export class ToggleSidebarComponent implements OnInit {
  private preload = usePreload(false);
  urlPage = urlPage;
  sidebarVisible$!: Observable<boolean>;
  cartState$!: Observable<{
    totalMenu: number;
  }>;
  cartAdminState$!: Observable<{
    totalMenu: number;
  }>;

  constructor(
    private sidebarService: SidebarService,
    private cartService: CartService,
    private cartAdminService: CartAdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cartState$ = this.cartService.getState().pipe(
      map(({ totalMenu }) => ({ totalMenu })), // hanya ambil yang dibutuhkan
      tap(() => this.cdr.detectChanges()),
    );

    this.cartAdminState$ = this.cartAdminService.getState().pipe(
      map(({ totalMenu }) => ({ totalMenu })),
      tap(() => this.cdr.detectChanges()),
    );

    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  get cart$() {
    return this.preload.isUser() ? this.cartState$ : this.cartAdminState$;
  }
}
