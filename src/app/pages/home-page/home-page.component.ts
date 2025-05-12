import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService, Profile } from '../../shared/services/profile.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  standalone: true,
})
export class HomePageComponent implements OnInit {
  profile: Profile | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
  }
}
