import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, NavbarComponent, LoadingComponent],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {}
