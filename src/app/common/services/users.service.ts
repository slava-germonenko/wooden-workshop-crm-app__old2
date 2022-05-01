import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrlsService } from '@common/services/api-urls.service';
import { map, Observable } from 'rxjs';
import { UserProfile } from '@common/interfaces/entities';
import { BaseHttpResponses } from '@common/interfaces/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getUserProfile(userId: string): Observable<UserProfile> {
    const userProfileUrl = this.apiUrlsService.getUserProfileEndpointUrl(userId);
    return this.httpClient.get<BaseHttpResponses<UserProfile>>(userProfileUrl)
      .pipe(
        map((response) => response.data),
      )
  }

  public updateUserProfile(user: UserProfile): Observable<UserProfile> {
    const baseUserUrl = this.apiUrlsService.getUsersEndpointUrl();
    return this.httpClient.patch<BaseHttpResponses<UserProfile>>(baseUserUrl, user)
      .pipe(
        map((response) => response.data),
      )
  }
}
