import { Component, inject, OnDestroy } from '@angular/core';
import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';
import {
  Notification,
  NotificationService,
} from '../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { Subscription } from 'rxjs';
import { usePreload } from '../../shared/utils/use-preload';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    CommonModule,
    NotificationCardComponent,
    PaginatorModule,
    SkeletonModule,
  ],
  templateUrl: './notification-page.component.html',
})
export class NotificationPageComponent implements OnDestroy {
  notifications: Notification[] = [];
  paginated: Notification[] = [];
  loading: boolean = false;
  preload = usePreload(false);

  // Pagination
  first: number = 0;
  rows: number = 5;

  private sub = new Subscription();
  private seoService = inject(SeoService);

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Notification | Warmakth',
        description: '-',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }

    const s = this.notificationService.getState().subscribe((state) => {
      this.notifications = state.notifications;
      this.loading = state.loading;
      this.paginate({ first: this.first, rows: this.rows });
    });
    this.sub.add(s);
  }

  paginate(event: { first?: number; rows?: number }) {
    const start = event.first ?? 0;
    const end = start + (event.rows ?? this.rows);
    this.first = start;
    this.paginated = this.notifications.slice(start, end);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
