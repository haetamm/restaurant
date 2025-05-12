import { urlPage } from './../../shared/utils/constans';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bootstrapAlexa } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  viewProviders: [provideIcons({ bootstrapAlexa })],
})
export class NavbarComponent implements OnInit {
  urlPage = urlPage;
  profile: Profile | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
  }

  handleLogout() {
    this.authService.logout();
  }
}
