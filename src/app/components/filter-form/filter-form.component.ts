import { filterFields } from './../../shared/utils/fields';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-form.component.html',
})
export class FilterFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<{
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  }>();
  filterForm: FormGroup;
  filterFields = filterFields;
  queryParams: any;
  initialMinPrice: string = '';
  initialMaxPrice: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    this.queryParams = this.route?.snapshot?.queryParams || {};

    this.initialMinPrice =
      this.queryParams.minPrice === '0' ? '' : this.queryParams.minPrice || '';

    this.initialMaxPrice =
      this.queryParams.maxPrice === '100000000'
        ? ''
        : this.queryParams.maxPrice || '';

    this.filterForm = this.fb.group({
      minPrice: this.initialMinPrice,
      maxPrice: this.initialMaxPrice,
      sortBy: [this.queryParams.sortBy || 'name'],
    });
  }

  // Fungsi bantu untuk navigasi
  private navigateWithQueryParams(queryParams: any, emitValues: any) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.filterChange.emit(emitValues);
        this.menuService.fetchMenus(queryParams);
        this.close.emit();
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }

  onFilterSubmit() {
    const filterValues = this.filterForm.value;
    const queryParams = {
      ...this.queryParams,
      minPrice: filterValues.minPrice || 0,
      maxPrice: filterValues.maxPrice || 100000000,
      sortBy: filterValues.sortBy || 'name',
      page: 1,
    };

    this.navigateWithQueryParams(queryParams, filterValues);
  }

  onFilterReset() {
    this.filterForm.reset({
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
    });

    const queryParams = {
      ...this.queryParams,
      minPrice: 0,
      maxPrice: 100000000,
      sortBy: 'name',
      page: 1,
    };

    this.navigateWithQueryParams(queryParams, this.filterForm.value);
  }
}
