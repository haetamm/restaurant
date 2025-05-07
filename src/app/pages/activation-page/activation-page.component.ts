import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  state$!: Observable<{ token: string | null; loading: boolean }>;
  token: string | null = null;
  isTokenChecked = false;
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || null;

      if (this.token && this.authService) {
        this.state$ = this.authService.getState();
      } else {
        this.state$ = of({ token: null, loading: false });
      }

      this.isTokenChecked = true;
    });
  }

  onSubmit() {
    if (this.token) {
      this.authService.activation(this.token);
    }
  }
}
