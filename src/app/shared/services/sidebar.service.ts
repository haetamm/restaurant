import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private sidebarVisible$ = new BehaviorSubject<boolean>(false);

  toggleSidebar(): void {
    this.sidebarVisible$.next(!this.sidebarVisible$.value);
  }

  showSidebar(): void {
    this.sidebarVisible$.next(true);
  }

  hideSidebar(): void {
    this.sidebarVisible$.next(false);
  }

  getSidebarState() {
    return this.sidebarVisible$.asObservable();
  }
}
