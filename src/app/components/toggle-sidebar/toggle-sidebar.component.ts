import { Component } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFilterRight, bootstrapXLg } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-toggle-sidebar',
  imports: [CommonModule, NgIcon],
  templateUrl: './toggle-sidebar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
      bootstrapFilterRight,
    }),
  ],
})
export class ToggleSidebarComponent {
  sidebarVisible$!: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Ambil status sidebar
    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
