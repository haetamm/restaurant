import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bootstrapSearch, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgIcon, CommonModule, ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapSearch,
      bootstrapXLg,
    }),
  ],
})
export class SearchbarComponent implements OnInit {
  @Input() initialSearch: string = '';
  @Output() searchChange = new EventEmitter<string>();
  searchControl = new FormControl('');

  ngOnInit(): void {
    // Inisialisasi nilai input dari @Input
    this.searchControl.setValue(this.initialSearch, { emitEvent: false });
  }

  // Handle Enter key press untuk pencarian
  onEnter() {
    this.searchChange.emit(this.searchControl.value || '');
  }
}
