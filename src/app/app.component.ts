import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from './shared/services/profile.service';
import { LoadingComponent } from './components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoading = true; // State lokal untuk loading awal (server dan klien)

  private profileService = inject(ProfileService);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit(): Promise<void> {
    // Hanya jalankan setProfile di klien (browser)
    if (isPlatformBrowser(this.platformId)) {
      try {
        await this.profileService.setProfile();
      } finally {
        this.isLoading = false; // Matikan loading lokal setelah setProfile selesai
      }
    } else {
      // Di server, tetap tampilkan loading
      this.isLoading = true;
    }
  }
}
