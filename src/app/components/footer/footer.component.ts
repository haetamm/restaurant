import { navigationLinks } from './../../shared/utils/helper';
import { Component } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  navigationLinks = navigationLinks;
  constructor(private scrollService: ScrollService) {}

  scrollTo(section: string) {
    this.scrollService.scrollTo(section);
  }
}
