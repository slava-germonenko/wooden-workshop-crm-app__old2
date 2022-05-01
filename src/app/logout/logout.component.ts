import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService, AuthService } from '@common/services';

@Component({
  selector: 'ww-logout',
  template: `
    <div
      class="full-size"
      [nbSpinner]="true"
      nbSpinnerSize="giant"
      nbSpinnerStatus="primary"
      nbSpinnerMessage="Выходим из приложения"
    ></div>
  `,
  styles: [
    ':host { display: block }'
  ],
})
export class LogoutComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['full-size']

  public constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.appService.setSidebarVisible(false);
    this.appService.setToolbarVisible(false);

    this.authService.signOut()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
