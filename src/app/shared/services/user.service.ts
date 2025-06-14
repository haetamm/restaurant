import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from './modal.service';
import { userApi } from '../api/user.api';

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  username: string;
  roles: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  loading: boolean;
  users: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private state = new BehaviorSubject<UsersState>({
    users: [],
    loading: false,
  });
  state$: Observable<UsersState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);
  private readonly modalService = inject(ModalService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchUsers(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const data = await userApi.getAllUser();
      this.updateState({
        users: data,
        loading: false,
      });
    } catch (error: any) {
      this.updateState({ users: [], loading: false });
      this.toastService.error(error.message || 'Failed to load users');
    }
  }

  async activateOrInactivateUser(id: string): Promise<void> {
    try {
      const updatedUser = await userApi.activateOrInactivateUser(id);
      const currentUsers = this.state.value.users;
      const updatedUsers = currentUsers.map((m) =>
        m.id === updatedUser.id ? updatedUser : m,
      );

      this.updateState({
        users: updatedUsers,
      });
      this.toastService.success('User berhasil diupdate!');
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mengupdate user');
    }
  }

  getState(): Observable<UsersState> {
    return this.state$;
  }

  getUsers(): User[] | [] {
    return this.state.value.users;
  }

  private updateState(newState: Partial<UsersState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
