import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { bootstrapFilterRight, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { ScrollService } from '../../shared/services/scroll.service';
import { urlPage } from './../../shared/utils/constans';
import { navigationLinks } from './../../shared/utils/helper';

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
  }

  scrollTo(section: string) {
    if (this.router.url !== this.urlPage.WELCOME) {
      this.router.navigate([this.urlPage.WELCOME]).then(() => {
        setTimeout(() => {
          this.scrollService.scrollTo(section);
        }, 100);
      });
    } else {
      this.scrollService.scrollTo(section);
    }

    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
