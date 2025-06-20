import { urlPage } from './../../shared/utils/constans';
import { Component } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notfound-page.component.html',
  styleUrl: './notfound-page.component.scss',
})
export class NotfoundPageComponent {
  urlPage = urlPage;
  constructor(
    private seoService: SeoService,
    private location: Location,
  ) {}
  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Not Found | Warmakth',
      description: 'Explore our awesome app!',
      url: '',
      keywords: 'not found, warmakth, restaurant',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
  }

  goBack() {
    this.location.back();
  }
}
