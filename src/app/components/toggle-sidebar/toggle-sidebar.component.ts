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
  urlPage = urlPage;
  sidebarVisible$!: Observable<boolean>;
  cartState$!: Observable<{
    loading: boolean;
    totalMenu: number;
  }>;

  constructor(
    private sidebarService: SidebarService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cartState$ = this.cartService.getState().pipe(
      map(({ loading, totalMenu }) => ({ loading, totalMenu })), // hanya ambil yang dibutuhkan
      tap(() => this.cdr.detectChanges()),
    );

    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
