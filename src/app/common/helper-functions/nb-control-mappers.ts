import { NbMenuItem } from '@nebular/theme';

import { Button } from '@common/interfaces/controls';

export function mapButtonToNbMenuItem(button: Button): NbMenuItem {
  return {
    title: button.label,
    icon: button.icon,
    link: button.routerLink,
  }
}
