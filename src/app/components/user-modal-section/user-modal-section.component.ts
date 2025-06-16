import { formatDate } from './../../shared/utils/helper';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-modal-section',
  imports: [],
  templateUrl: './user-modal-section.component.html',
})
export class UserModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();
  user: User | null = null;
  formatDate = formatDate;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserDetail();
  }

  closeModal() {
    this.userService.resetUserDetail();
    this.onClose.emit();
  }
}
