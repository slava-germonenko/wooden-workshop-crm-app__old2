import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import {
  Observable,
  Subscription,
  distinctUntilChanged,
  map,
  interval,
  combineLatest,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { select } from '@ngneat/elf';

import { userProfilesAreEqual } from '@common/helper-functions';
import { Button } from '@common/interfaces/controls';
import { UserProfile } from '@common/interfaces/entities';
import { AuthService } from '@common/services/auth.service';
import { currentUserStore, navigationStore } from '@common/state/stores';

import { PROFILE_MENU_ITEMS, REFRESH_TOKEN_INTERVAL } from '@app/app.constants';

@Injectable({ providedIn: 'root' })
export class AppService {
  private readonly navigationStore = navigationStore;

  private readonly currentUserStore = currentUserStore;

  private refreshTokenSubscription: Subscription | null = null;

  public readonly currentUserProfile$ = this.currentUserStore.pipe(
    map((userState) => userState.profile),
    distinctUntilChanged(userProfilesAreEqual),
  );

  public readonly isAuthorized$ = this.currentUserProfile$.pipe(
    map((profile) => profile !== null),
  );

  public readonly profileMenuItems$: Observable<Button[]> = this.isAuthorized$.pipe(
    map((isAuthorized) => isAuthorized ? PROFILE_MENU_ITEMS : []),
  )

  public readonly sidebarVisible$ = this.navigationStore.pipe(
    select((navState) => navState.sidebarVisible),
  );

  public readonly sidebarItems$ = this.navigationStore.pipe(
    select((navState) => navState.sidebarItems),
  )

  public readonly toolbarVisible$ = this.navigationStore.pipe(
    select((navState) => navState.toolbarVisible),
  );

  public get currentUserProfileSnapshot(): UserProfile | null {
    return this.currentUserStore.state.profile;
  }

  public constructor(
    private readonly authService: AuthService,
    private readonly toastr: NbToastrService,
  ) { }

  public startUserSession(profile: UserProfile): void {
    this.currentUserStore.update((state) => (
      { ...state, profile }
    ));

    this.navigationStore.update((state) => (
      { ...state, sidebarVisible: true, toolbarVisible: true }
    ));

    this.refreshTokenSubscription = this.createRefreshTokenStream();
  }

  public setSidebarVisible(sidebarVisible: boolean): void {
    this.navigationStore.update((state) => ({ ...state, sidebarVisible }))
  }

  public setToolbarVisible(toolbarVisible: boolean): void {
    this.navigationStore.update((state) => ({ ...state, toolbarVisible }))
  }

  public setSidebarItems(sidebarItems: Button[]): void {
    this.navigationStore.update((navState) => ({...navState, sidebarItems}));
  }

  private createRefreshTokenStream(): Subscription {
    return combineLatest([this.isAuthorized$, interval(REFRESH_TOKEN_INTERVAL)])
      .pipe(
        filter(([isAuthorized]) => isAuthorized),
        switchMap(() => this.authService.refreshRefreshToken()),
        tap({
          error: () => {
            this.toastr.danger('Произошла ошибка при попытке обновить сессию.', 'Ошибка авторизации.');
            this.authService.signOut();
          }
        })
      ).subscribe();
  }
}
