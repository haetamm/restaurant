import { urlPage } from './../../shared/utils/constans';
import { Component } from '@angular/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { SeoService } from '../../shared/services/seo.service';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ServiceSectionComponent } from '../../components/service-section/service-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../shared/services/scroll.service';
import { LandingPageMenuSectionComponent } from '../../components/landing-page-menu-section/landing-page-menu-section.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    RouterModule,
    HeroSectionComponent,
    ServiceSectionComponent,
    ContactSectionComponent,
    LandingPageMenuSectionComponent,
  ],
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent {
  profile: Profile | null = null;
  urlPage = urlPage;
  private scrollSubscription: Subscription;

  constructor(
    private profileService: ProfileService,
    private seoService: SeoService,
    private scrollService: ScrollService,
  ) {
    this.scrollSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Warmakth',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/home',
      keywords: 'home, app, angular',
      image: 'https://your-app.com/assets/default-image.jpg',
    });

    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });

    this.scrollSubscription = this.scrollService.scrollTo$.subscribe(
      (section) => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
