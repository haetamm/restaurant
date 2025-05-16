import { Component } from '@angular/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [],
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent {
  profile: Profile | null = null;

  constructor(
    private profileService: ProfileService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Restaurant',
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
