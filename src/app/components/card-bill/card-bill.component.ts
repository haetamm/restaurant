import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getMenuNames } from '../../shared/utils/helper';

@Component({
  selector: 'app-card-bill',
  imports: [CommonModule],
  templateUrl: './card-bill.component.html',
})
export class CardBillComponent {
  @Input() bill: any;
  @Input() formatDate!: (date: string) => string;
  getMenuNames = getMenuNames;
}
