import { urlPage } from './../../shared/utils/constans';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SidebarService } from '../../shared/services/sidebar.service';
import { Observable } from 'rxjs';

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
  sidebarVisible$!: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarVisible$ = this.sidebarService.getSidebarState();
  }
}
