import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { setGreeting } from '../../shared/utils/helper';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  profile: Profile | null = null;
  greeting: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getState().subscribe((state) => {
      this.profile = state.profile;
    });
    this.greeting = setGreeting();
  }

  get displayName(): string {
    if (this.profile) {
      return this.profile.name || this.profile.username;
    }
    return 'Hello';
  }
}
