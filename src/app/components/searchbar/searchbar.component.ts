import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  bootstrapSearch,
  bootstrapFilterRight,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgIcon, CommonModule, ReactiveFormsModule],
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
export class SearchbarComponent implements OnInit {
  @Input() initialSearch: string = '';
  @Output() searchChange = new EventEmitter<string>();
  searchControl = new FormControl('');
  sidebarVisible$!: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Inisialisasi nilai input dari @Input
    this.searchControl.setValue(this.initialSearch, { emitEvent: false });

    // Ambil status sidebar
    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }

  // Handle Enter key press
  onEnter() {
    const value = this.searchControl.value || '';
    const trimmedValue = value.trim();
    this.searchChange.emit(trimmedValue);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
