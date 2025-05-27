import { deliveryBillFields } from './../../shared/utils/fields';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cart, CartService } from '../../shared/services/cart.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CommonModule } from '@angular/common';
import { ListCartItemComponent } from '../list-cart-item/list-cart-item.component';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  bootstrapChevronCompactDown,
  bootstrapChevronCompactUp,
} from '@ng-icons/bootstrap-icons';
import { ModalService } from '../../shared/services/modal.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { deliveryBillSchema } from '../../shared/utils/validation';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { BillFormComponent } from '../bill-form/bill-form.component';
import {
  BillService,
  DeliveryBillRequest,
} from '../../shared/services/bill.service';

@Component({
  selector: 'app-checkout-section',
  standalone: true,
  imports: [
    NgIcon,
    CartSummaryComponent,
    CommonModule,
    ListCartItemComponent,
    ReactiveFormsModule,
    BillFormComponent,
  ],
  templateUrl: './checkout-section.component.html',
  viewProviders: [
    provideIcons({ bootstrapChevronCompactDown, bootstrapChevronCompactUp }),
  ],
})
export class CheckoutSectionComponent implements OnInit {
  loading = false;
  profile: Profile | null = null;
  deliveryBillForm = new FormGroup({
    recipientName: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    deliveryAddress: new FormControl<string>('', [Validators.required]),
  });
  deliveryBillFields = deliveryBillFields;
  carts: Cart[] = [];

  isVisible = false;
  cartState$!: Observable<{
    carts: Cart[];
    loading: boolean;
    totalMenu: number;
    totalQty: number;
    totalPrice: number;
  }>;

  private profileService = inject(ProfileService);

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private billService: BillService,
  ) {
    setupZodValidation(
      this.deliveryBillForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      deliveryBillSchema,
    );
  }

  ngOnInit(): void {
    this.cartService.fetchCart();
    this.cartState$ = this.cartService.getState().pipe(
      tap((state) => {
        this.cdr.detectChanges();
      }),
    );

    this.profile = this.profileService.getProfile();
    if (this.profile) {
      this.deliveryBillForm.patchValue({
        recipientName: this.profile.name,
        phone: this.profile.phone,
        deliveryAddress: this.profile.address,
      });
    }
  }

  trackById(index: number, item: Cart): string {
    return item.id;
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
  }

  closeModal() {
    this.modalService.hideModal();
  }

  async onSubmit(formValue?: any) {
    if (this.deliveryBillForm.invalid) {
      this.deliveryBillForm.markAllAsTouched();
      return;
    }

    const { data } = deliveryBillSchema.safeParse(
      formValue || this.deliveryBillForm.value,
    );

    if (!data) return;

    this.carts = this.cartService.getCart();

    const payload: DeliveryBillRequest = {
      recipientName: data.recipientName,
      phone: data.phone,
      deliveryAddress: data.deliveryAddress,
      billRequest: this.carts.map((cart) => ({
        menuId: cart.menuId,
        qty: cart.qty,
      })),
    };
    this.loading = true;
    try {
      await this.billService.createDeliveryBill(payload);
    } finally {
      this.loading = false;
    }
  }
}
