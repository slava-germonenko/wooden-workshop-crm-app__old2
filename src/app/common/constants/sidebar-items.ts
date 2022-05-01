import { Button } from '@common/interfaces/controls';

export const PROFILE_SIDEBAR_ITEMS: Button[] = [
  {
    name: 'personal-data',
    label: 'Персональные данные',
    icon: 'person-outline',
    routerLink: '/profile/personal-data',
  },
  {
    name: 'security',
    label: 'Безопасность',
    icon: 'shield-outline',
    routerLink: '/profile/security',
  },
]
