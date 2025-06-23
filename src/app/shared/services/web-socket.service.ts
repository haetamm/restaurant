import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { NotificationService, Notification } from './notification.service';
import { authApi } from '../api/auth.api';
import { BASE_URL } from '../utils/constans';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient?: Client;
  private readonly TOPIC = '/user/queue/notifications/order';

  constructor(private notificationService: NotificationService) {}

  private get WS_ENDPOINT(): string {
    const token = authApi.getAccessToken();
    const base = BASE_URL.replace(/\/api$/, '');
    return `${base}/ws?token=${token}`;
  }

  connect(): void {
    const socket = new SockJS(this.WS_ENDPOINT);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket connected');
        this.subscribeToNotifications();
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      },
    });

    this.stompClient.activate();
  }

  private subscribeToNotifications(): void {
    if (!this.stompClient) return;

    this.stompClient.subscribe(this.TOPIC, (message: IMessage) => {
      const notification: Notification = JSON.parse(message.body);
      this.notificationService.handleIncomingNotification(notification);
    });
  }

  disconnect(): void {
    this.stompClient?.deactivate();
  }
}
