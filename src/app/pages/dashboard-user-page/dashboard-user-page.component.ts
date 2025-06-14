import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';

@Component({
  selector: 'app-dashboard-user-page',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './dashboard-user-page.component.html',
})
export class DashboardUserPageComponent {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUsers();
  }
}
