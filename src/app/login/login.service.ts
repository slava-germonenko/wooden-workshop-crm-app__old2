import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, map, tap, switchMap } from 'rxjs';
import { getParser } from 'bowser';

import { VOID_FUNC } from '@common/constants';
import { AppService, AuthService, UsersService } from '@common/services';

@Injectable()
export class LoginService {
  public constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: NbToastrService,
    private readonly usersService: UsersService,
  ) { }

  public login(emailAddress: string, passwords: string): Observable<void> {
    const device = getParser(window.navigator.userAgent);
    const deviceName = `${device.getBrowserName()} ${device.getBrowserVersion()} на ${device.getOSName()}`;
    return this.authService.authorize(emailAddress, passwords, deviceName)
      .pipe(
        switchMap(({ accessToken }) => this.usersService.getUserProfile(accessToken.userId)),
        tap({
          next: (user) => {
            this.appService.startUserSession(user);
            this.appService.setSidebarVisible(true);
            this.appService.setToolbarVisible(true);
            this.router.navigate(['/profile']);
          },
          error: () => {
            this.toastr.danger('Введённый логин и/или пароль не верен.', 'Ошибка авторизации');
          },
        }),
        map(VOID_FUNC),
      );
  }
}
