import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbInputModule } from '@nebular/theme';

import { InterceptorsProvider, WithAccessTokenInterceptor } from '@common/interceptors';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
]

@NgModule({
  imports: [
    HttpClientModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
    InterceptorsProvider.provide(WithAccessTokenInterceptor),
  ]
})
export class LoginModule { }
