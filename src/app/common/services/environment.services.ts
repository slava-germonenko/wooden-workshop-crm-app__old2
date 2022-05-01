import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentServices {
  private readonly env = { ...environment };

  public get baseApiRoute(): string {
    return this.env.baseApiRoute;
  }
}
