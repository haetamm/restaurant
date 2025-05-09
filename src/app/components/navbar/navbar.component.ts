import { urlPage } from './../../shared/utils/constans';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bootstrapAlexa } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Observable, of } from 'rxjs';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  viewProviders: [provideIcons({ bootstrapAlexa })],
})
export class NavbarComponent {
  urlPage = urlPage;
  state$!: Observable<{ loading: boolean; profile: Profile | null }>;

  private profileService = inject(ProfileService);

  constructor() {
    this.state$ = this.profileService.getState();
  }
}
