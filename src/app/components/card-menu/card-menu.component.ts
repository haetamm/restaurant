import { BASE_URL } from './../../shared/utils/constans';
import { Component, Input } from '@angular/core';
import { Menu } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-menu.component.html',
})
export class CardMenuComponent {
  @Input() menu!: Menu;

  get imageUrl(): string {
    return this.menu.image?.url
      ? BASE_URL + '/menus/' + this.menu.image.id + '/images'
      : '/img/notfound-menu.jpg';
  }

  get isBlur(): boolean {
    return !this.menu.id;
  }
}
