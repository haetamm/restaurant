import { Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { urlPage } from '../../shared/utils/constans';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  bootstrapPersonFill,
  bootstrapShieldLockFill,
} from '@ng-icons/bootstrap-icons';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-setting-page',
  imports: [NgIcon, CommonModule, RouterModule, ButtonModule],
  templateUrl: './setting-page.component.html',
  viewProviders: [
    provideIcons({
      bootstrapPersonFill,
      bootstrapShieldLockFill,
    }),
  ],
})
export class SettingPageComponent {
  showSidebar = false;
  navItems = [
    {
      label: 'Profile',
      icon: 'bootstrapPersonFill',
      link: urlPage.SETTINGS_PROFILE,
    },
    {
      label: 'Security',
      icon: 'bootstrapShieldLockFill',
      link: urlPage.SETTINGS_SECURITY,
    },
  ];

  constructor(private router: Router) {}

  isActiveSubRoute(route: string): boolean {
    return this.router.url === route;
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
