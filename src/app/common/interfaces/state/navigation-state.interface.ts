import { Button } from '@common/interfaces/controls';

export interface NavigationState {
  toolbarVisible: boolean;
  sidebarVisible: boolean;
  sidebarItems: Button[];
}
