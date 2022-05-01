import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AppService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  public constructor(
    private readonly appService: AppService,
    private readonly router: Router,
  ) { }

  public canActivate(): Observable<boolean | UrlTree>{
    return this.activateOrRedirect();
  }

  public canActivateChild(): Observable<boolean | UrlTree> {
    return this.activateOrRedirect();
  }

  private activateOrRedirect(): Observable<boolean | UrlTree> {
    return this.appService.isAuthorized$
      .pipe(
        map((isAuthorized) => isAuthorized ? isAuthorized : this.buildLoginPageUrlTree())
      )
  }

  private buildLoginPageUrlTree(): UrlTree {
    return this.router.createUrlTree(['/login']);
  }
}

