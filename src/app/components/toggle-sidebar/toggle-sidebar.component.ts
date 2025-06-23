import { urlPage } from './../../shared/utils/constans';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapBell,
  bootstrapFilterRight,
  bootstrapHandbag,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { CartService } from '../../shared/services/cart.service';
import { RouterModule } from '@angular/router';
import { CartAdminService } from '../../shared/services/cart-admin.service';
import { usePreload } from '../../shared/utils/use-preload';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-toggle-sidebar',
  imports: [CommonModule, NgIcon, RouterModule],
  templateUrl: './toggle-sidebar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
      bootstrapFilterRight,
      bootstrapHandbag,
      bootstrapBell,
    }),
  ],
})
export class ToggleSidebarComponent implements OnInit, OnDestroy {
  private preload = usePreload(false);
  private subscription = new Subscription();

  unReadCount: number = 0;
  urlPage = urlPage;
  sidebarVisible$!: Observable<boolean>;
  cartState$!: Observable<{ totalMenu: number }>;
  cartAdminState$!: Observable<{ totalMenu: number }>;

  constructor(
    private sidebarService: SidebarService,
    private cartService: CartService,
    private cartAdminService: CartAdminService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.cartState$ = this.cartService.getState().pipe(
      map(({ totalMenu }) => ({ totalMenu })),
      tap(() => this.cdr.detectChanges()),
    );

    this.cartAdminState$ = this.cartAdminService.getState().pipe(
      map(({ totalMenu }) => ({ totalMenu })),
      tap(() => this.cdr.detectChanges()),
    );

    const notifSub = this.notificationService.getState().subscribe((state) => {
      this.unReadCount = state.unreadCount;
    });
    this.subscription.add(notifSub);

    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  get cart$() {
    return this.preload.isUser() ? this.cartState$ : this.cartAdminState$;
  }
}
