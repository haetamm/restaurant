import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-user-table-header',
  imports: [IconField, InputIcon, FormsModule],
  templateUrl: './user-table-header.component.html',
})
export class UserTableHeaderComponent {
  @Input() children: any;
  @Input() searchText: string = '';
  @Input() placeholder: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
}
