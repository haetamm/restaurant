import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  Admin,
  AdminService,
  RegisterAdminRequest,
  UpdateAdminRequest,
} from '../../shared/services/admin.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import {
  registerAdminSchema,
  updateAdminSchema,
} from '../../shared/utils/validation';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    TextareaModule,
    KeyFilterModule,
  ],
  templateUrl: './admin-form.component.html',
})
export class AdminFormComponent {
  loading: boolean = false;
  adminDetail: Admin | null = null;
  adminForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>(''),
  });

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.adminService.getState().subscribe((state) => {
      this.adminDetail = state.adminDetail;
      if (this.adminDetail) {
        this.adminForm.patchValue({
          username: this.adminDetail.username,
          email: this.adminDetail.email,
        });
      }
      this.applyValidationSchema();
      this.cdr.detectChanges();
    });
  }

  async onSubmit() {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      if (this.adminDetail) {
        const payload: UpdateAdminRequest = {
          id: this.adminDetail.id,
          username: this.adminForm.value.username!,
          email: this.adminForm.value.email!,
          password: this.adminForm.value.password!,
        };
        await this.adminService.updateAdmin(payload);
      } else {
        const payload: RegisterAdminRequest = {
          username: this.adminForm.value.username!,
          email: this.adminForm.value.email!,
          password: this.adminForm.value.password!,
        };
        await this.adminService.createAdmin(payload);
      }
    } finally {
      this.loading = false;
    }
  }

  private applyValidationSchema(): void {
    const passwordControl = this.adminForm.get('password');
    if (this.adminDetail) {
      passwordControl?.setValidators([]);
    } else {
      passwordControl?.setValidators([Validators.required]);
    }

    // Terapkan validasi Zod
    setupZodValidation(
      this.adminForm.controls as unknown as Record<string, AbstractControl>,
      this.adminDetail ? updateAdminSchema : registerAdminSchema,
    );

    this.adminForm.updateValueAndValidity();
  }
}
