import { NbComponentStatus } from '@nebular/theme/components/component-status';

import { BaseControl } from './base-control.interface';

export interface Button extends BaseControl {
  click?: (target: Button) => void;
  routerLink?: string;
  status?: NbComponentStatus;
}
