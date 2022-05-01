import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Button } from '@common/interfaces/controls';
import { AppService } from '@common/services';

@Injectable()
export class SidebarItemsResolver implements Resolve<Button[]> {
  public constructor(private readonly appService: AppService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Button[]> {
    const sidenavButtons = route.data['sidebar'] ?? [] as Button[];
    this.appService.setSidebarItems(sidenavButtons);
    return sidenavButtons;
  }
}
