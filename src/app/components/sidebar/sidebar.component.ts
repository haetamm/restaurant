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
  urlPage = urlPage;
  navItems = [
    { label: 'Home', icon: 'bootstrapShopWindow', link: urlPage.HOME },
    { label: 'Transaksi', icon: 'bootstrapWallet2', link: urlPage.TRANSACTION },
    { label: 'Menu', icon: 'bootstrapClipboard2', link: '#' },
    {
      label: 'Table',
      icon: 'bootstrapCalendar2Check',
      link: '#',
    },
    { label: 'Customer', icon: 'heroUsers', link: urlPage.CUSTOMER },
    { label: 'Settings', icon: 'bootstrapGear', link: '#' },
  ];

  constructor(
    private modalService: ModalService,
    private sidebarService: SidebarService,
    public router: Router,
  ) {}

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
