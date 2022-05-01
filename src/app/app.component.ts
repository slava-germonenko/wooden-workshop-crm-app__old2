import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NbMenuComponent, NbMenuItem } from '@nebular/theme';
import { map } from 'rxjs';

import { EMPTY_ARRAY } from '@common/constants';
import { mapButtonToNbMenuItem } from '@common/helper-functions';
import { AppService } from '@common/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('menu')
  public menu?: NbMenuComponent;

  public readonly sidebarVisible$ = this.appService.sidebarVisible$;

  public readonly toolbarVisible$ = this.appService.toolbarVisible$;

  public readonly user$ = this.appService.currentUserProfile$;

  public readonly profileMenuItems$ = this.appService.profileMenuItems$.pipe(
    map((buttons) => buttons.map(mapButtonToNbMenuItem)),
  );

  public sidebarItems: NbMenuItem[] = EMPTY_ARRAY;

  constructor(private readonly appService: AppService) {}

  public ngAfterViewInit(): void {
    this.appService.sidebarItems$.subscribe((sidebarButtons) => {
      this.sidebarItems = sidebarButtons.map(mapButtonToNbMenuItem);
      if (this.menu) {
        this.menu.ngAfterViewInit();
      }
    })
  }
}
