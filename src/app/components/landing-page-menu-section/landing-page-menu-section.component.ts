import { createImgUrl } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Menu, MenuService } from '../../shared/services/menu.service';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-landing-page-menu-section',
  imports: [CommonModule, ImageModule, CarouselModule, SkeletonModule],
  templateUrl: './landing-page-menu-section.component.html',
  styleUrl: './landing-page-menu-section.component.scss',
})
export class LandingPageMenuSectionComponent {
  @Input() id: string = '';
  menus: Menu[] = [];
  loading: boolean = false;
  createImgUrl = createImgUrl;

  skeletonCards = Array(4).fill(0);

  responsiveOptions = [
    {
      breakpoint: '1280px', // xl
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1024px', // lg
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '640px', // xs
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '0px', // smaller screens
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getState().subscribe((state) => {
      this.menus = state.menus;
      this.loading = state.loading;
    });
  }
}
