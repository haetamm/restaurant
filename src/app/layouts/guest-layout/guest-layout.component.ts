import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { usePreload } from '../../shared/utils/use-preload';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet, CommonModule, LoadingComponent, ModalComponent],
  templateUrl: './guest-layout.component.html',
})
export class GuestLayoutComponent implements OnInit {
  preload = usePreload(false);

  async ngOnInit(): Promise<void> {
    await this.preload.initialize();
  }
}
