import { FileUpload } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { CategoryService } from '../../shared/services/category.service';
import { categoriesMeta } from '../../shared/utils/helper';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { menuSchema } from '../../shared/utils/validation';
import { MenuService, MenuRequest } from '../../shared/services/menu.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select,
    FloatLabel,
    InputTextModule,
    KeyFilterModule,
    FileUpload,
    ButtonModule,
  ],
  templateUrl: './menu-form.component.html',
})
export class MenuFormComponent implements OnInit {
  loading: boolean = false;
  categoriesMenu: any[] = [];
  uploadedFiles: File[] = [];
  menuForm: FormGroup;
  imagePreviewUrl: SafeUrl | null = null; // Untuk pratinjau gambar

  categorySubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private menuService: MenuService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      categoryId: [null, Validators.required],
      image: [null, Validators.required],
    });

    setupZodValidation(
      this.menuForm.controls as unknown as Record<string, AbstractControl>,
      menuSchema,
    );
  }

  ngOnInit(): void {
    // Berlangganan ke state categories menu
    this.categorySubscription = this.categoryService
      .getState()
      .subscribe((state) => {
        if (state.categories.length > 0) {
          this.categoriesMenu = [
            ...state.categories.map((cat) => {
              const match = categoriesMeta.find(
                (meta) => meta.value === cat.name,
              );
              return {
                label: match?.label || cat.name,
                value: cat.id,
              };
            }),
          ];
          this.cdr.detectChanges();
        }
      });
  }

  onUpload(event: FileUploadHandlerEvent) {
    const file = event.files?.[0];
    if (file) {
      this.menuForm.patchValue({ image: file });
      this.menuForm.get('image')?.markAsTouched();
      this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(file),
      );
    }
  }

  async onSubmit(): Promise<void> {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      await this.menuService.createMenu(this.menuForm.value as MenuRequest);
      this.resetForm();
    } catch (error: any) {
    } finally {
      this.loading = false;
    }
  }

  private resetForm(): void {
    this.menuForm.reset();
    this.imagePreviewUrl = null;
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
