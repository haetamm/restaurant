import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu, MenuService } from '../../shared/services/menu.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { createImgUrl } from '../../shared/utils/helper';

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './menu-table.component.html',
})
export class MenuTableComponent {
  coloumns: { name: string }[] = [];
  menus: Menu[] = [];
  loading: boolean = false;
  createImgUrl = createImgUrl;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.coloumns = [
      { name: 'GAMBAR' },
      { name: 'NAMA' },
      { name: 'HARGA' },
      { name: 'KATEGORI' },
      { name: 'ACTION' },
    ];
    this.menuService.getState().subscribe((state) => {
      this.menus = state.menus;
      this.loading = state.loading;
    });
  }
}
