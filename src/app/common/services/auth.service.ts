import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, finalize, map, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ACCESS_TOKEN_COOKIE_NAME, VOID_FUNC } from '@common/constants';
import { AuthorizationResult } from '@common/interfaces/entities';
import { BaseHttpResponses } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';
import { currentUserStore } from '@common/state/stores';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private get authUrl(): string {
    return this.apiUrlsService.getAuthEndpointUrl();
  }

  private readonly currentUserStore = currentUserStore;

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly cookieService: CookieService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {}

  public authorize(
    emailAddress: string,
    password: string,
    deviceName: string,
  ): Observable<AuthorizationResult> {
    const authRequest = { emailAddress, password, deviceName };
    return this.httpClient.post<BaseHttpResponses<AuthorizationResult>>(this.authUrl, authRequest)
      .pipe(
        map((response) => response.data),
        tap((authResult) => this.setAccessTokenCookie(authResult.accessToken.token)),
      )
  }

  public refreshRefreshToken(): Observable<AuthorizationResult> {
    return this.httpClient.put<BaseHttpResponses<AuthorizationResult>>(this.authUrl, null)
      .pipe(
        map((response) => response.data),
        tap((authResult) => this.setAccessTokenCookie(authResult.accessToken.token))
      );
  }

  public signOut(): Observable<void> {
    const signOutUrl = this.apiUrlsService.getSignOutEndpointUrl();
    return this.httpClient.post(signOutUrl, {})
      .pipe(
        finalize(() => {
          this.cookieService.delete(ACCESS_TOKEN_COOKIE_NAME);
          this.currentUserStore.update((userState) => ({ ...userState, profile: null }));
        }),
        map(VOID_FUNC),
      )
  }

  private setAccessTokenCookie(accessToken: string): void {
    this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, accessToken);
  }
}
