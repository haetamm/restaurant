import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-toggle-filter',
  imports: [CommonModule, FilterFormComponent, NgIcon],
  templateUrl: './toggle-filter.component.html',
  viewProviders: [
    provideIcons({
      heroAdjustmentsHorizontal,
      bootstrapXLg,
    }),
  ],
})
export class ToggleFilterComponent {
  isFilterVisible = false;

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  closeFilter() {
    this.isFilterVisible = false;
  }
}
