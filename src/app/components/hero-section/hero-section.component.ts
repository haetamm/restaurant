import { urlPage } from './../../shared/utils/constans';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @Input() id: string = '';
  urlPage = urlPage;
}
