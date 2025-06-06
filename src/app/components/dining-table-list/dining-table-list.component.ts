import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DiningTableCardComponent } from '../dining-table-card/dining-table-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dining-table-list',
  standalone: true,
  templateUrl: './dining-table-list.component.html',
  imports: [DiningTableCardComponent, CommonModule],
})
export class DiningTableListComponent {
  @Input() tables: any[] = [];
  @Input() loading: boolean = false;
  @Input() isUser: boolean = false;
  @Output() statusChange = new EventEmitter<{ id: string; isTaken: boolean }>();
}
