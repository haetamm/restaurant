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
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { menuSchema, menuUpdateSchema } from '../../shared/utils/validation';
import {
  MenuService,
  MenuRequest,
  Menu,
  MenuUpdateRequest,
} from '../../shared/services/menu.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';

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
  menuDetail: Menu | null = null;
  categorySubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private menuService: MenuService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
  ) {
    // Inisialisasi form tanpa validator image awal
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      categoryId: [null, Validators.required],
      image: [null], // Tidak set validator awal
    });
  }

  ngOnInit(): void {
    // Berlangganan ke state menu detail
    this.menuService.getState().subscribe((state) => {
      this.menuDetail = state.menuDetail;
      // Terapkan skema validasi berdasarkan menuDetail
      this.applyValidationSchema();
      if (this.menuDetail) {
        this.menuForm.patchValue({
          name: this.menuDetail.name,
          price: this.menuDetail.price,
          categoryId: this.menuDetail.categoryId,
        });
        // Reset image agar opsional saat edit
        this.menuForm.get('image')?.setValue(null);
      }
      this.cdr.detectChanges();
    });

    // Berlangganan ke state categories menu
    this.categorySubscription = this.categoryService
      .getState()
      .subscribe((state) => {
        if (state.categories.length > 0) {
          this.categoriesMenu = [
            ...state.categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            })),
          ];
          this.cdr.detectChanges();
        }
      });
  }

  private applyValidationSchema(): void {
    const passwordControl = this.menuForm.get('image');
    if (this.menuDetail) {
      passwordControl?.setValidators([]); // update mode: password opsional
    } else {
      passwordControl?.setValidators([Validators.required]); // create mode: password wajib
    }

    setupZodValidation(
      this.menuForm.controls as unknown as Record<string, AbstractControl>,
      this.menuDetail ? menuUpdateSchema : menuSchema,
    );
    // Perbarui status form
    this.menuForm.updateValueAndValidity();
  }

  onUpload(event: FileUploadHandlerEvent) {
    const file = event.files?.[0];
    if (file) {
      this.menuForm.patchValue({ image: file });
      this.menuForm.get('image')?.markAsTouched();
      this.menuForm.get('image')?.updateValueAndValidity();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      if (this.menuDetail) {
        const payload = {
          id: this.menuDetail.id,
          name: this.menuForm.value.name,
          price: this.menuForm.value.price,
          categoryId: this.menuForm.value.categoryId,
          image: this.menuForm.value.image,
        };
        await this.menuService.updateMenu(payload as MenuUpdateRequest);
        this.resetForm();
      } else {
        await this.menuService.createMenu(this.menuForm.value as MenuRequest);
        this.resetForm();
      }
    } finally {
      this.loading = false;
    }
  }

  onShowMenuFormBulk() {
    this.modalService.showMenuFormBulk();
  }

  onCancel(): void {
    this.menuService.resetMenuDetail();
    this.menuForm.reset();
    this.modalService.hideModal();
  }

  private resetForm(): void {
    this.menuForm.reset();
    this.applyValidationSchema(); // Reapply schema setelah reset
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
