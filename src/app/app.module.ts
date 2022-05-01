import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbToastrModule,
  NbListModule,
  NbIconModule,
  NbUserModule,
  NbContextMenuModule,
  NbMenuModule,
} from '@nebular/theme';

import { BASE_TOASTR_CONFIG } from '@common/constants';
import { InterceptorsProvider, WithAccessTokenInterceptor } from '@common/interceptors';
import { SidebarItemsResolver } from '@common/resolvers';
import { AppService, AuthService, UsersService } from '@common/services';
import { FullNameModule } from '@framework/full-name';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { appInitializerFactory } from '@app/app-initializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FullNameModule,
    HttpClientModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({name: 'default'}),
    NbToastrModule.forRoot(BASE_TOASTR_CONFIG),
    NbUserModule,
  ],
  providers: [
    SidebarItemsResolver,
    InterceptorsProvider.provide(WithAccessTokenInterceptor),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppService, AuthService, UsersService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
