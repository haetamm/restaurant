import { createImgUrl } from '../../shared/utils/helper';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPlusLg } from '@ng-icons/bootstrap-icons';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, NgIcon, Image],
  templateUrl: './menu-card.component.html',
  viewProviders: [provideIcons({ bootstrapPlusLg })],
})
export class MenuCardComponent {
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
