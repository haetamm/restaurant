import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { usePreload } from '../../shared/utils/use-preload';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { MenuService } from '../../shared/services/menu.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-default-layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    LoadingComponent,
    CommonModule,
    ModalComponent,
    FooterComponent,
  ],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  preload = usePreload(true);

  constructor(private menuService: MenuService) {}

  async ngOnInit(): Promise<void> {
    await this.preload.initialize();
    const payload = { category: 'main' };
    await this.menuService.fetchMenus(payload);
  }
}
