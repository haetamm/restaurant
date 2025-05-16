import { categoriesMenu } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categorybar',
  imports: [CommonModule],
  templateUrl: './categorybar.component.html',
})
export class CategorybarComponent {
  categoriesMenu = categoriesMenu;
}
