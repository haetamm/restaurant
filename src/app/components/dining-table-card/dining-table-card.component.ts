import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-dining-table-card',
  standalone: true,
  imports: [ToggleSwitchModule, CommonModule, FormsModule],
  templateUrl: './dining-table-card.component.html',
})
export class DiningTableCardComponent {
  @Input() table: any | null = null;
  @Input() isUser: boolean = false;
  @Output() statusChange = new EventEmitter<{ id: string; isTaken: boolean }>();

  onToggleChange(event: any) {
    if (this.table) {
      this.statusChange.emit({ id: this.table.id, isTaken: event.checked });
    }
  }
}
