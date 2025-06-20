import { Component } from '@angular/core';
import { urlPage } from '../../shared/utils/constans';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  bootstrapShopWindow,
  bootstrapClipboard2,
  bootstrapWallet2,
  bootstrapCalendar2Check,
  bootstrapGear,
  bootstrapBoxArrowLeft,
} from '@ng-icons/bootstrap-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { SidebarService } from '../../shared/services/sidebar.service';
import { isActiveRoute } from '../../shared/utils/helper';
import { ModalService } from '../../shared/services/modal.service';
import { usePreload } from '../../shared/utils/use-preload';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, AvatarComponent, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapShopWindow,
      bootstrapClipboard2,
      bootstrapWallet2,
      bootstrapCalendar2Check,
      heroUsers,
      bootstrapGear,
      bootstrapBoxArrowLeft,
    }),
  ],
})
export class SidebarComponent {
  private preload = usePreload(false);
  urlPage = urlPage;

  constructor(
    private modalService: ModalService,
    private sidebarService: SidebarService,
    public router: Router,
  ) {}

  get navItems() {
    const baseItems = [
      { label: 'Home', icon: 'bootstrapShopWindow', link: urlPage.HOME },
      {
        label: 'Transaksi',
        icon: 'bootstrapWallet2',
        link: urlPage.TRANSACTION,
      },
      { label: 'Meja', icon: 'bootstrapCalendar2Check', link: urlPage.TABLE },
    ];

    if (this.preload.isAdmin()) {
      baseItems.push(
        { label: 'Menu', icon: 'bootstrapClipboard2', link: urlPage.MENU },
        {
          label: 'Admin Panel',
          icon: 'bootstrapGear',
          link: urlPage.DASHBOARD,
        },
      );
    }

    if (this.preload.isUser()) {
      baseItems.splice(4, 0, {
        label: 'Settings',
        icon: 'bootstrapGear',
        link: urlPage.SETTINGS,
      });
    }

    return baseItems;
  }

  isRouteActive(path: string, exact: boolean = false): boolean {
    return isActiveRoute(this.router, path, exact);
  }

  handleLogout() {
    this.modalService.showLogout();
  }

  closeSidebar() {
    this.sidebarService.hideSidebar();
  }
}
