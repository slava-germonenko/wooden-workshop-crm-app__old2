import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '@app/login/login.service';

@Component({
  selector: 'ww-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @HostBinding('class')
  public readonly hostClasses = ['place-center', 'full-size', 'background-color'];

  public readonly loginFormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
  ) { }

  public login(): void {
    this.loginService.login(
      this.loginFormGroup.get('emailAddress')?.value as string,
      this.loginFormGroup.get('password')?.value as string,
    ).subscribe();
  }
}
