import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  bootstrapSearch,
  bootstrapFilterRight,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-searchbar',
  imports: [NgIcon, CommonModule],
  templateUrl: './searchbar.component.html',
  viewProviders: [
    provideIcons({
      bootstrapSearch,
      bootstrapFilterRight,
    }),
  ],
})
export class SearchbarComponent {}
