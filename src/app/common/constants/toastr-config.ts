import { NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';

export const BASE_TOASTR_CONFIG: Partial<NbToastrConfig> = {
  position: NbGlobalPhysicalPosition.TOP_RIGHT,
  duration: 5000,
  limit: 5,
}
