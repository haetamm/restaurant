import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  bootstrapSearch,
  bootstrapFilterRight,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  imports: [NgIcon, CommonModule],
  templateUrl: './searchbar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapSearch,
      bootstrapFilterRight,
      heroAdjustmentsHorizontal,
      bootstrapXLg,
    }),
  ],
})
export class SearchbarComponent {
  constructor(private sidebarService: SidebarService) {}
  sidebarVisible$!: Observable<boolean>;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }
}
