import { Component } from '@angular/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { generateGoogleAuthUrl, openPopup } from '../../shared/utils/helper';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-button-google',
  imports: [NgIcon],
  templateUrl: './button-google.component.html',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class ButtonGoogleComponent {
  constructor(private authService: AuthService) {}
  get isLoading(): boolean {
    return this.authService.getLoading();
  }
  handleButton() {
    const googleAuthUrl = generateGoogleAuthUrl();
    openPopup(googleAuthUrl, 900, 800);
  }
}
