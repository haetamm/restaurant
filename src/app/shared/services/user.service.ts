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
  isEnable: boolean;
  roles: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  loading: boolean;
  users: User[];
  userDetail: User | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private state = new BehaviorSubject<UsersState>({
    users: [],
    loading: false,
    userDetail: null,
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
      const updatedUsers = currentUsers.map((user) =>
        user.id === id ? { ...user, isEnable: !user.isEnable } : user,
      );

      this.updateState({
        users: updatedUsers,
      });
      this.toastService.success(updatedUser);
    } catch (error: any) {
      this.toastService.error(error.message || 'Gagal mengupdate user');
    }
  }

  getState(): Observable<UsersState> {
    return this.state$;
  }

  getUserById(id: string): void {
    const users = this.state.value.users;
    const user = users.find((user) => user.id === id);
    this.updateState({ userDetail: user });
  }

  getUsers(): User[] | [] {
    return this.state.value.users;
  }

  getUserDetail(): User | null {
    return this.state.value.userDetail;
  }

  private updateState(newState: Partial<UsersState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
