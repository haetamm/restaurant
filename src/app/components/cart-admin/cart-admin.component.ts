import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Table, TableService } from '../../shared/services/table.service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { bootstrapThreeDots } from '@ng-icons/bootstrap-icons';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { Observable, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CartAdmin,
  CartAdminService,
  RequestMenu,
} from '../../shared/services/cart-admin.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { createImgUrl } from '../../shared/utils/helper';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-cart-admin',
  standalone: true,
  imports: [
    NgIcon,
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
    FloatLabel,
    KeyFilterModule,
    ButtonModule,
    CommonModule,
    CartSummaryComponent,
    InputNumber,
    FormsModule,
  ],
  templateUrl: './cart-admin.component.html',
  viewProviders: [
    provideIcons({
      bootstrapThreeDots,
    }),
  ],
})
export class CartAdminComponent implements OnInit, OnDestroy {
  tables: Table[] = [];
  form: FormGroup;
  cartState$!: Observable<{
    cart: CartAdmin | null;
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  }>;
  qty: number = 50;

  createImgUrl = createImgUrl;

  private tableSubscription: Subscription | null = null;
  private modalService = inject(ModalService);

  constructor(
    private tableService: TableService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private cartAdminService: CartAdminService,
  ) {
    this.form = this.fb.group({
      selectedTable: [null],
      customerName: [''],
      customerPhone: [''],
    });
  }

  ngOnInit(): void {
    this.tableSubscription = this.tableService.getState().subscribe((state) => {
      this.tables = state.tables;
      this.cdr.detectChanges();
    });

    this.cartState$ = this.cartAdminService.getState().pipe(
      tap(() => {
        this.cdr.detectChanges();
      }),
    );
  }

  ngOnDestroy(): void {
    if (this.tableSubscription) {
      this.tableSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const formValues = this.form.value;
    this.cartAdminService
      .updateCart({
        customerName: formValues.customerName,
        customerPhone: formValues.customerPhone,
        tableName: formValues.selectedTable
          ? formValues.selectedTable.name
          : '',
      })
      .then(() => {
        console.log('Cart updated successfully');
      });
  }

  trackById(index: number, item: RequestMenu): string {
    return item.id || index.toString();
  }

  updateQuantity(itemId: string, newQty: number): void {
    this.cartAdminService.updateItemQuantity(itemId, newQty);
  }

  deleteByMenuId(menuId: string): void {
    this.modalService.showDelete(async () => {
      this.cartAdminService.deleteItemByMenuId(menuId);
    });
  }
}
