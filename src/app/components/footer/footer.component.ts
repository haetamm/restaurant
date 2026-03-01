import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';
import { urlPage } from '../../shared/utils/constans';
import { navigationLinks } from './../../shared/utils/helper';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  navigationLinks = navigationLinks;
  urlPage = urlPage;
  constructor(
    private scrollService: ScrollService,
    private router: Router,
  ) {}

  scrollTo(section: string) {
    if (this.router.url !== this.urlPage.WELCOME) {
      this.router.navigate([this.urlPage.WELCOME]).then(() => {
        setTimeout(() => {
          this.scrollService.scrollTo(section);
        }, 100);
      });
    } else {
      this.scrollService.scrollTo(section);
    }
  }
}
