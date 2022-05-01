import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AppService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class UnauthorizedGuard implements CanActivate, CanActivateChild {
  private readonly isUnauthorized$ = this.appService.isAuthorized$
    .pipe(
      map((isAuthorized) => !isAuthorized),
    );

  public constructor(private readonly appService: AppService) { }

  public canActivate(): Observable<boolean>{
    return this.isUnauthorized$;
  }

  public canActivateChild(): Observable<boolean> {
    return this.isUnauthorized$;
  }
}
