import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PASSWORD_FORM_FIELDS } from '@app/profile/security/constants';

@Component({
  selector: 'ww-security',
  templateUrl: 'security.component.html',
  styleUrls: ['security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent {
  public readonly formFields = [...PASSWORD_FORM_FIELDS];
}
