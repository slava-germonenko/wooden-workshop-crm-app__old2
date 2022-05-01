import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { InterceptorsProvider, WithAccessTokenInterceptor } from '@common/interceptors';

import { PersonalDataComponent, PersonalDataService } from '@app/profile/personal-data';
import { SecurityComponent, SecurityService } from '@app/profile/security';
import { FormModule } from '@framework/form/form.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personal-data',
  },
  {
    path: 'personal-data',
    component: PersonalDataComponent,
  },
  {
    path: 'security',
    component: SecurityComponent,
  }
];

@NgModule({
  imports: [
    FormModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SecurityComponent,
    PersonalDataComponent,
  ],
  providers: [
    SecurityService,
    PersonalDataService,
    InterceptorsProvider.provide(WithAccessTokenInterceptor),
  ],
})
export class ProfileModule { }
