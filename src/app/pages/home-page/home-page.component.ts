import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService, Profile } from '../../shared/services/profile.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  standalone: true,
})
export class HomePageComponent implements OnInit {
  profile: Profile | null = null;

  constructor(
    private profileService: ProfileService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Home | Restaurant',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/home',
      keywords: 'home, app, angular',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
  }
}
