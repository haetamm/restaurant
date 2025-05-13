import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {}
