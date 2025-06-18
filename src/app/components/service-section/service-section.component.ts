import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-section',
  imports: [CommonModule],
  templateUrl: './service-section.component.html',
})
export class ServiceSectionComponent {
  @Input() id: string = '';
  cards = [
    {
      title: 'Deliver Your Food',
      description:
        'Deliver your best order to your destination—fast, safe, and still warm.',
      image: 'img/delivery.jpg',
      colors: {
        bgFrom: 'from-blue-50',
        bgTo: 'to-cyan-50',
        border: 'border-blue-100',
        textTitle: 'text-blue-600',
        textDesc: 'text-blue-800/90',
      },
    },
    {
      title: 'Dine-In Experience',
      description:
        'Enjoy a cozy and welcoming atmosphere while you dine at our restaurant with friendly service.',
      image: 'img/dine-in.jpg',
      colors: {
        bgFrom: 'from-green-50',
        bgTo: 'to-emerald-50',
        border: 'border-green-100',
        textTitle: 'text-green-600',
        textDesc: 'text-green-800/90',
      },
    },
    {
      title: 'Online Ordering',
      description:
        'Order easily through our website with just a few clicks—anytime, anywhere.',
      image: 'img/order.jpg',
      colors: {
        bgFrom: 'from-purple-50',
        bgTo: 'to-violet-50',
        border: 'border-purple-100',
        textTitle: 'text-purple-600',
        textDesc: 'text-purple-800/90',
      },
    },
    {
      title: 'Freshly Cooked',
      description:
        'We only start cooking once you place your order—so every meal is served fresh, flavorful, and made just for you.',
      image: 'img/cook.jpg',
      colors: {
        bgFrom: 'from-amber-50',
        bgTo: 'to-orange-50',
        border: 'border-amber-100',
        textTitle: 'text-amber-600',
        textDesc: 'text-amber-800/90',
      },
    },
  ];
}
