import { Component, OnInit } from '@angular/core';
import { CheckoutSectionComponent } from '../checkout-section/checkout-section.component';
import { Observable } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CheckoutSectionComponent, CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  modalVisible$!: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalVisible$ = this.modalService.getModalState();
  }
}
