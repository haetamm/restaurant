import { selectPayment, formatDate } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getMenuNames } from '../../shared/utils/helper';

@Component({
  selector: 'app-bill-card',
  imports: [CommonModule],
  templateUrl: './bill-card.component.html',
})
export class BillCardComponent {
  @Input() isUser: boolean = false;
  selectPayment = selectPayment;
  @Input() bill: any;
  formatDate = formatDate;
  getMenuNames = getMenuNames;
}
