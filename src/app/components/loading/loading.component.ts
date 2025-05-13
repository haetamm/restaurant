import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading) {
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  private profileService = inject(ProfileService);

  get isLoading(): boolean {
    return this.profileService.getLoading();
  }
}
