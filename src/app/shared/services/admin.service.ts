import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from './modal.service';
import { userApi } from '../api/user.api';
import { authApi } from '../api/auth.api';

export interface RegisterAdminRequest {
  email: string;
  username: string;
  password: string;
}

export interface UpdateAdminRequest {
  id: string;
  email: string;
  username: string;
  password: string | null;
}

export interface Admin {
  id: string;
  email: string;
  username: string;
  isEnable: boolean;
  roles: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface AdminsState {
  loading: boolean;
  admins: Admin[];
  adminDetail: Admin | null;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private state = new BehaviorSubject<AdminsState>({
    admins: [],
    loading: false,
    adminDetail: null,
  });
  state$: Observable<AdminsState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);
  private readonly modalService = inject(ModalService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchAdmins(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await userApi.getAdminUser();
      this.updateState({
        admins: data,
        loading: false,
      });
    } catch (error: any) {
      this.updateState({ admins: [], loading: false });
      this.toastService.error(error.message || 'Failed to load admin');
    }
  }

  async createAdmin(payload: RegisterAdminRequest): Promise<void> {
    try {
      const newAdmin = await authApi.registerAdmin(payload);
      const currentAdmins = this.state.value.admins;
      this.updateState({
        admins: [newAdmin, ...currentAdmins],
      });
      this.modalService.hideModal();
      this.toastService.success('Admin berhasil dibuat!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Failed to create admin', {
        autoClose: false,
      });
      throw error;
    }
  }

  async updateAdmin(payload: UpdateAdminRequest): Promise<void> {
    try {
      const updatedAdmin = await userApi.updateAdminUser(payload);
      const currentAdmins = this.state.value.admins;
      const updatedAdmins = currentAdmins.map((m) =>
        m.id === updatedAdmin.id ? updatedAdmin : m,
      );

      this.updateState({
        admins: updatedAdmins,
        adminDetail: null,
      });
      this.modalService.hideModal();
      this.toastService.success('Admin berhasil diupdate!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Failed to update admin');
      throw error;
    }
  }

  async activateOrInactivateAdmin(id: string): Promise<void> {
    try {
      const updatedAdmin = await userApi.activateOrInactivateUser(id);
      const currenAdmins = this.state.value.admins;
      const updatedAdmins = currenAdmins.map((admin) =>
        admin.id === id ? { ...admin, isEnable: !admin.isEnable } : admin,
      );

      this.updateState({
        admins: updatedAdmins,
        adminDetail: null,
      });
      this.toastService.success(updatedAdmin);
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mengupdate user');
    }
  }

  getState(): Observable<AdminsState> {
    return this.state$;
  }

  getAdminById(id: string): void {
    const admins = this.state.value.admins;
    const admin = admins.find((admin) => admin.id === id);
    this.updateState({ adminDetail: admin });
  }

  getAdmins(): Admin[] | [] {
    return this.state.value.admins;
  }

  getAdminDetail(): Admin | null {
    return this.state.value.adminDetail;
  }

  resetAdminDetail(): void {
    this.updateState({ adminDetail: null });
  }

  private updateState(newState: Partial<AdminsState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
