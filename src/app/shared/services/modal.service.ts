import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalVisible$ = new BehaviorSubject<boolean>(false);

  toggleModal(): void {
    this.modalVisible$.next(!this.modalVisible$.value);
  }

  showModal(): void {
    this.modalVisible$.next(true);
  }

  hideModal(): void {
    this.modalVisible$.next(false);
  }

  getModalState() {
    return this.modalVisible$.asObservable();
  }
}
