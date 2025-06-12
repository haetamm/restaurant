import { isActiveRoute } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  bootstrapPersonFill,
  bootstrapShieldLockFill,
  bootstrapPersonFillGear,
  bootstrapPersonLinesFill,
  bootstrapPersonHeart,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { urlPage } from '../../shared/utils/constans';
import { usePreload } from '../../shared/utils/use-preload';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-authorize-layout',
  imports: [NgIcon, CommonModule, RouterModule, ButtonModule],
  templateUrl: './authorize-layout.component.html',
  viewProviders: [
    provideIcons({
      bootstrapPersonFill,
      bootstrapShieldLockFill,
      bootstrapPersonFillGear,
      heroUsers,
      bootstrapPersonLinesFill,
      bootstrapPersonHeart,
    }),
  ],
})
export class AuthorizeLayoutComponent {
  showSidebar = false;
  private preload = usePreload(false);

  get navItems() {
    const baseItems = [];

    if (this.preload.isAdmin()) {
      baseItems.push(
        {
          label: 'Pelanggan',
          icon: 'bootstrapPersonHeart',
          link: urlPage.CUSTOMER,
        },
        {
          label: 'Pengguna',
          icon: 'bootstrapPersonLinesFill',
          link: urlPage.DASHBOARD_USER,
        },
      );
    }

    if (this.preload.isSuperAdmin()) {
      baseItems.push({
        label: 'Admin',
        icon: 'bootstrapPersonFillGear',
        link: urlPage.DASHBOARD_ADMIN,
      });
    }

    if (this.preload.isUser()) {
      baseItems.push(
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
      );
    }

    return baseItems;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  isRouteActive(path: string, exact: boolean = false): boolean {
    return isActiveRoute(this.router, path, exact);
  }
}
