import { Button } from '@common/interfaces/controls';

export const PROFILE_MENU_ITEMS: Button[] = [
  {
    name: 'profile',
    label: 'Профиль',
    routerLink: '/profile',
  },
  {
    name: 'sign-out',
    label: 'Выход',
    routerLink: '/logout',
  }
];

export const REFRESH_TOKEN_INTERVAL = 25000;
