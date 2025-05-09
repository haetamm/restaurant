import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading || (state$ | async)?.loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() isLoading = false; // Input dari AppComponent untuk loading awal
  state$: Observable<{ loading: boolean; profile: Profile | null }>;

  private profileService = inject(ProfileService);

  constructor() {
    this.state$ = this.profileService.getState();
  }
}
