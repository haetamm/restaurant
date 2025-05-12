import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { NotfoundPageComponent } from '../notfound-page/notfound-page.component';

@Component({
  selector: 'app-activation-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NotfoundPageComponent],
  templateUrl: './activation-page.component.html',
  styleUrl: './activation-page.component.scss',
})
export class ActivationPageComponent implements OnInit {
  token: string | null = null;
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.token = params['token'] || null;
    });
  }

  get isLoading(): boolean {
    return this.authService.getLoading();
  }

  onSubmit() {
    if (this.token) {
      this.authService.activation(this.token);
    }
  }
}
