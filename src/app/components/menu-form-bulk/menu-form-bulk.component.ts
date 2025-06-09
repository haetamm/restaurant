import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import {
  MenuBulkRequest,
  MenuService,
} from '../../shared/services/menu.service';
import { menuBulkSchema } from '../../shared/utils/validation';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-menu-form-bulk',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './menu-form-bulk.component.html',
})
export class MenuFormBulkComponent {
  menuFormBulk: FormGroup;
  jsonData: MenuBulkRequest[] = [];
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private readonly toastService = inject(HotToastService);

  constructor(
    private menuService: MenuService,
    private modalService: ModalService,
  ) {
    this.menuFormBulk = this.fb.group({
      file: [null, Validators.required],
    });

    setupZodValidation(
      this.menuFormBulk.controls as unknown as Record<string, AbstractControl>,
      menuBulkSchema,
    );
  }

  onFileChange(event: any) {
    const file: File = event.files[0];

    if (!file) {
      this.menuFormBulk.controls['file'].setValue(null);
      this.menuFormBulk.controls['file'].markAsTouched();
      return;
    }

    // Update the form control with the selected file
    this.menuFormBulk.controls['file'].setValue(file);
    this.menuFormBulk.controls['file'].markAsTouched();

    // Process the Excel file
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

      this.jsonData = data.map((item: any) => ({
        name: item.name || '',
        price: Number(item.price) || 0,
        categoryId: item.categoryId || '',
      }));
    };
    reader.readAsBinaryString(file);
  }

  async submit() {
    this.menuFormBulk.markAllAsTouched();
    if (this.menuFormBulk.invalid || !this.jsonData.length) {
      this.toastService.error(
        'Formulir tidak valid atau belum ada data untuk dikirim.',
      );
      return;
    }

    this.loading = true;
    try {
      await this.menuService.createMenuBulk(this.jsonData);
      this.resetForm();
    } finally {
      this.loading = false;
    }
  }

  private resetForm() {
    this.menuFormBulk.reset();
    this.jsonData = [];
  }

  downloadTemplate(): void {
    const link = document.createElement('a');
    link.href = '/template/menu.xlsx';
    link.download = 'menu.xlsx';
    link.click();
  }
}
