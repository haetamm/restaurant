import { navigationLinks } from './../../shared/utils/helper';
import { urlPage } from './../../shared/utils/constans';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../shared/services/scroll.service';
import { bootstrapFilterRight, bootstrapXLg } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIcon, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  viewProviders: [provideIcons({ bootstrapFilterRight, bootstrapXLg })],
})
export class NavbarComponent implements OnInit {
  urlPage = urlPage;
  profile: Profile | null = null;
  isScrolled = false;
  activeSection: string = '';
  navigationLinks = navigationLinks;
  isDropdownOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 30;

    const sectionIds = ['home', 'services', 'menu', 'contact'];

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom > 60) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  constructor(
    private profileService: ProfileService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit(): void {
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
  }

  scrollTo(section: string) {
    this.scrollService.scrollTo(section);
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
