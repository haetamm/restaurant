import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bootstrapSearch, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgIcon, CommonModule, ReactiveFormsModule, FilterFormComponent],
  templateUrl: './searchbar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapSearch,
      heroAdjustmentsHorizontal,
      bootstrapXLg,
    }),
  ],
})
export class SearchbarComponent implements OnInit {
  @Input() initialSearch: string = '';
  @Output() searchChange = new EventEmitter<string>();
  searchControl = new FormControl('');
  isFilterVisible = false;

  ngOnInit(): void {
    // Inisialisasi nilai input dari @Input
    this.searchControl.setValue(this.initialSearch, { emitEvent: false });
  }

  // Handle Enter key press untuk pencarian
  onEnter() {
    this.searchChange.emit(this.searchControl.value || '');
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  closeFilter() {
    this.isFilterVisible = false;
  }
}
