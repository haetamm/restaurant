import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  imports: [ToggleSwitchModule, FormsModule, CommonModule],
})
export class TablePageComponent implements OnInit {
  tables: any[] = [];

  ngOnInit() {
    // Data dummy 20 meja
    this.tables = [
      { id: '1', name: 'A1', isTaken: false },
      { id: '2', name: 'A2', isTaken: true },
      { id: '3', name: 'A3', isTaken: false },
      { id: '4', name: 'A4', isTaken: false },
      { id: '5', name: 'A5', isTaken: true },
      { id: '6', name: 'A6', isTaken: false },
      { id: '7', name: 'A7', isTaken: false },
      { id: '8', name: 'A8', isTaken: true },
      { id: '9', name: 'A9', isTaken: false },
      { id: '10', name: 'A10', isTaken: false },
      { id: '11', name: 'B1', isTaken: true },
      { id: '12', name: 'B2', isTaken: false },
      { id: '13', name: 'B3', isTaken: false },
      { id: '14', name: 'B4', isTaken: true },
      { id: '15', name: 'B5', isTaken: false },
      { id: '16', name: 'B6', isTaken: false },
      { id: '17', name: 'B7', isTaken: true },
      { id: '18', name: 'B8', isTaken: false },
      { id: '19', name: 'B9', isTaken: false },
      { id: '20', name: 'B10', isTaken: true },
    ];
  }

  updateTableStatus(id: string, isTaken: boolean) {
    // Simulasi update ke backend
    console.log(`Update meja ${id} isTaken: ${isTaken}`);
    // Jika pakai API:
    // this.http.put(`/meja/${id}`, { isTaken }).subscribe(
    //   () => console.log('Status updated'),
    //   error => console.error('Error updating status:', error)
    // );
  }
}
