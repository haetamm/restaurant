import { Component } from '@angular/core';
import { bootstrapThreeDots } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-cart-header',
  imports: [NgIcon],
  templateUrl: './cart-header.component.html',
  viewProviders: [
    provideIcons({
      bootstrapThreeDots,
    }),
  ],
})
export class CartHeaderComponent {}
