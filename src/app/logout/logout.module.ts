import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbSpinnerModule } from '@nebular/theme';

import { LogoutComponent } from '@app/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: LogoutComponent,
  }
];

@NgModule({
  imports: [
    NbSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LogoutComponent,
  ],
})
export class LogoutModule {}
