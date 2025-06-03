import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Table, TableService } from '../../shared/services/table.service';
import { ButtonModule } from 'primeng/button';
import { Observable, Subscription, tap, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CartAdmin,
  CartAdminService,
} from '../../shared/services/cart-admin.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CartHeaderComponent } from '../cart-header/cart-header.component';
import { ListCartAdminItemComponent } from '../list-cart-admin-item/list-cart-admin-item.component';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import {
  adminCartSchema,
  AdminCartFormType,
} from '../../shared/utils/validation';
import {
  BillService,
  DineInBillRequest,
} from '../../shared/services/bill.service';
import { CartAdminFormComponent } from '../cart-admin-form/cart-admin-form.component';

@Component({
  selector: 'app-cart-admin',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CartSummaryComponent,
    CartHeaderComponent,
    ListCartAdminItemComponent,
    CartAdminFormComponent,
  ],
  templateUrl: './cart-admin.component.html',
})
export class CartAdminComponent implements OnInit, OnDestroy {
  tables: Table[] = [];
  loading: boolean = false;
  adminCartForm: FormGroup;
  cartState$!: Observable<{
    cart: CartAdmin | null;
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  }>;

  private tableSubscription: Subscription | null = null;
  private billService = inject(BillService);

  constructor(
    private tableService: TableService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private cartAdminService: CartAdminService,
  ) {
    this.adminCartForm = this.fb.group({
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      tableName: [null, Validators.required],
    });

    setupZodValidation(
      this.adminCartForm.controls as unknown as Record<string, AbstractControl>,
      adminCartSchema,
    );

    this.cartState$ = this.cartAdminService.getState().pipe(
      tap(() => {
        this.cdr.detectChanges();
      }),
    );
  }

  ngOnInit(): void {
    this.tableSubscription = this.tableService.getState().subscribe((state) => {
      this.tables = state.tables;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.tableSubscription) {
      this.tableSubscription.unsubscribe();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.adminCartForm.invalid) {
      this.adminCartForm.markAllAsTouched();
      return;
    }

    const result = adminCartSchema.safeParse(this.adminCartForm.value);
    if (!result.success) return;

    const formData: AdminCartFormType = result.data;

    this.cartState$.pipe(take(1)).subscribe(async (state) => {
      const cart = state.cart;

      if (!cart || !cart.billRequest || cart.billRequest.length === 0) {
        return;
      }

      const payload: DineInBillRequest = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        tableName: formData.tableName,
        billRequest: cart.billRequest.map((item) => ({
          menuId: item.id,
          qty: item.qty,
        })),
      };

      this.loading = true;
      try {
        await this.billService.createDineInBill(payload);
        this.adminCartForm.reset();
      } finally {
        this.loading = false;
      }
    });
  }
}
