import { Component, Input } from '@angular/core';
import { Menu } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-menu',
  imports: [CommonModule],
  templateUrl: './card-menu.component.html',
})
export class CardMenuComponent {
  @Input() menu!: Menu;
}
