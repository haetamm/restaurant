// src/app/components/loading/loading.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../shared/services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isLoading || ((loading$ | async) ?? false)"
      class="loading-overlay"
    >
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() isLoading = false;
  loading$: Observable<boolean>;

  private profileService = inject(ProfileService);

  constructor() {
    this.loading$ = this.profileService.loading$;
  }
}
