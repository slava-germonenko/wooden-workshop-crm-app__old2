import { Injectable } from '@angular/core';
import { EnvironmentServices } from '@common/services/environment.services';

@Injectable({ providedIn: 'root' })
export class ApiUrlsService {
  public constructor(private readonly environmentService: EnvironmentServices) { }

  public getAuthEndpointUrl(): string {
    return `${this.environmentService.baseApiRoute}/auth`;
  }

  public getSignOutEndpointUrl(): string {
    return `${this.environmentService.baseApiRoute}/auth/sign-out`;
  }

  public getUserProfileEndpointUrl(userId: string): string {
    return `${this.environmentService.baseApiRoute}/users/${userId}/profile`;
  }

  public getUsersEndpointUrl(): string {
    return `${this.environmentService.baseApiRoute}/users`;
  }
}
