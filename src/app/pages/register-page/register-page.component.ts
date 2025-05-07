import { Component, OnInit, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { registerSchema } from '../../shared/utils/validation';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { registerFields } from '../../shared/utils/fields';
import { urlPage } from '../../shared/utils/constans';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class RegisterPageComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  registerFields = registerFields;
  urlPage = urlPage;
  state$!: Observable<{ token: string | null; loading: boolean }>;

  private authService = inject(AuthService);

  constructor(private router: Router) {
    setupZodValidation(
      this.registerForm.controls as unknown as Record<string, AbstractControl>,
      registerSchema,
    );
  }

  ngOnInit() {
    if (this.authService) {
      this.state$ = this.authService.getState();
    } else {
      this.state$ = of({ token: null, loading: false });
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const result = registerSchema.safeParse(this.registerForm.value);
    if (!result.success) return;

    this.authService.register(result.data);
  }
}
