import { urlPage } from './../../shared/utils/constans';
import { Component } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notfound-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notfound-page.component.html',
  styleUrl: './notfound-page.component.scss',
})
export class NotfoundPageComponent {
  urlPage = urlPage;
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Not Found | Restaurant',
      description: 'Explore our awesome app!',
      url: '',
      keywords: 'not found, app, angular',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
  }
}
