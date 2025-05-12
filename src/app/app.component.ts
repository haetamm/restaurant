// src/app/app.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from './shared/services/profile.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private profileService = inject(ProfileService);
  private toastService = inject(HotToastService);

  ngOnInit(): void {
    this.profileService.fetchProfile().subscribe({
      next: (profile) => {},
      error: (error) => {
        console.error('Error in AppComponent:', error); // Debugging
        this.toastService.error(error.message || 'Gagal memuat profil');
      },
    });
  }
}
