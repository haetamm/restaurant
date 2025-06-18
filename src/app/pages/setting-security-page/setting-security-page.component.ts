import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { EmailChangeFormComponent } from '../../components/email-change-form/email-change-form.component';
import { PasswordChangeFormComponent } from '../../components/password-change-form/password-change-form.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-setting-security-page',
  standalone: true,
  imports: [
    TabsModule,
    InputTextModule,
    EmailChangeFormComponent,
    PasswordChangeFormComponent,
  ],
  templateUrl: './setting-security-page.component.html',
})
export class SettingSecurityPageComponent {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Security | Warmakth',
        description: 'Explore our awesome app!',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }
  }
}
