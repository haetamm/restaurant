import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-modal-small',
  standalone: true,
  imports: [],
  templateUrl: './modal-small.component.html',
})
export class ModalSmallComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() buttonLabel: string = 'Confirm';
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  loading = false;
  private modalSubscription!: Subscription;

  private readonly modalService = inject(ModalService);

  ngOnInit(): void {
    this.modalSubscription = this.modalService
      .getModalState()
      .subscribe((state) => {
        this.loading = state.loading;
      });
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  handleButton() {
    this.onSubmit.emit();
  }

  cancelButton() {
    this.onClose.emit();
  }
}
