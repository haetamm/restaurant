import { urlPage } from './../../shared/utils/constans';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    SidebarComponent,
    SidebarComponent,
  ],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  urlPage = urlPage;
}
