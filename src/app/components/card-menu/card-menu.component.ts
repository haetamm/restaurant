import { createImgUrl } from './../../shared/utils/helper';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPlusLg } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './card-menu.component.html',
  viewProviders: [provideIcons({ bootstrapPlusLg })],
})
export class CardMenuComponent {
  @Input() menu!: Menu;
  @Input() loadingButton!: boolean;
  @Output() addToCart = new EventEmitter<string>();

  get imageUrl(): string {
    return createImgUrl(this.menu?.image?.id);
  }

  isBlur(): boolean {
    return !this.menu.id;
  }

  onAddToCart() {
    this.addToCart.emit(this.menu.id);
  }
}
