import { Component } from '@angular/core';
import { urlPage } from '../../shared/utils/constans';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterModule } from '@angular/router';
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
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, AvatarComponent, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
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
    { label: 'Menu', icon: 'bootstrapClipboard2', link: '#' },
    { label: 'Tagihan', icon: 'bootstrapWallet2', link: '#' },
    {
      label: 'Table',
      icon: 'bootstrapCalendar2Check',
      link: '#',
    },
    { label: 'Customer', icon: 'heroUsers', link: urlPage.CUSTOMER },
    { label: 'Settings', icon: 'bootstrapGear', link: '#' },
  ];

  constructor(private authService: AuthService) {}

  handleLogout() {
    this.authService.logout();
  }
}
