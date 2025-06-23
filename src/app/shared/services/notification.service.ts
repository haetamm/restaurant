import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { notificationApi } from '../api/notification.api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  billId: string;
  recipientId: string;
  customerName: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsState {
  loading: boolean;
  notifications: Notification[];
  unreadCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private state = new BehaviorSubject<NotificationsState>({
    notifications: [],
    loading: false,
    unreadCount: 0,
  });
  state$: Observable<NotificationsState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchNotifications(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await notificationApi.getAll();
      const unreadCount = data.filter((n: Notification) => !n.isRead).length;

      this.updateState({
        notifications: data,
        loading: false,
        unreadCount: unreadCount,
      });
    } catch (error: any) {
      this.updateState({ notifications: [], loading: false, unreadCount: 0 });
      this.toastService.error(error.message || 'Failed to load notifications');
    }
  }

  async updateByid(id: string): Promise<void> {
    try {
      await notificationApi.updateById(id);

      const currentNotifications = this.state.value.notifications;
      const updatedNotifications = currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification,
      );

      const updatedUnreadCount = updatedNotifications.filter(
        (n) => !n.isRead,
      ).length;

      this.updateState({
        notifications: updatedNotifications,
        unreadCount: updatedUnreadCount,
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mengupdate user');
    }
  }

  handleIncomingNotification(notification: Notification): void {
    const updated = [notification, ...this.state.value.notifications];
    const unread = updated.filter((n) => !n.isRead).length;

    this.updateState({
      notifications: updated,
      unreadCount: unread,
    });

    this.toastService.success('Order baru diterima');
  }

  getState(): Observable<NotificationsState> {
    return this.state$;
  }

  getNotifications(): Notification[] | [] {
    return this.state.value.notifications;
  }

  private updateState(newState: Partial<NotificationsState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
