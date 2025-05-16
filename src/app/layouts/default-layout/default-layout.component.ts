import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { usePreload } from '../../shared/utils/use-preload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, NavbarComponent, LoadingComponent, CommonModule],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  preload = usePreload(true);

  async ngOnInit(): Promise<void> {
    await this.preload.initialize();
  }
}
