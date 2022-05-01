import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { VOID_FUNC } from '@common/constants';
import { AppService, AuthService, UsersService } from '@common/services';

export function appInitializerFactory(
  appService: AppService,
  authService: AuthService,
  usersService: UsersService,
): () => Observable<void> {
  return () => authService.refreshRefreshToken()
    .pipe(
      switchMap(({ accessToken }) => usersService.getUserProfile(accessToken.userId)),
      tap((user) => {
        appService.startUserSession(user);
        appService.setSidebarVisible(true);
        appService.setToolbarVisible(true);
      }),
      catchError(() => of(undefined)),
      map(VOID_FUNC),
    )
}
