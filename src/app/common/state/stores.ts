import { createStore, withProps } from '@ngneat/elf';

import { CurrenUserState, NavigationState } from '@common/interfaces/state';

const DEFAULT_NAVIGATION_STATE: NavigationState = {
  toolbarVisible: false,
  sidebarVisible: false,
  sidebarItems: [],
};

export const navigationStore = createStore(
  { name: 'navigation' },
  withProps<NavigationState>(DEFAULT_NAVIGATION_STATE),
)

const DEFAULT_USER_STATE: CurrenUserState = {
  profile: null,
}

export const currentUserStore = createStore(
  { name: 'user' },
  withProps<CurrenUserState>(DEFAULT_USER_STATE),
);
