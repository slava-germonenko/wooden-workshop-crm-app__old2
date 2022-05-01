import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, filter, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

import { userProfilesAreEqual } from '@common/helper-functions';
import { UserProfile } from '@common/interfaces/entities';
import { AppService, UsersService } from '@common/services';
import { DEFAULT_UPDATE_PROFILE_ERROR_MESSAGE, PROFILE_UPDATED_DEFAULT_MESSAGE } from '@app/profile/constants';
import { DEFAULT_SAVED_ERROR_MESSAGE, DEFAULT_SAVED_MESSAGE } from '@common/constants';

@Injectable()
export class PersonalDataService {
  public readonly personalData$ = this.appService.currentUserProfile$
    .pipe(
      filter((user) => user !== null),
      distinctUntilChanged(userProfilesAreEqual),
      map((user) => user as UserProfile),
      switchMap(({ id }) => this.usersService.getUserProfile(id)),
      shareReplay(1),
    )

  public constructor(
    private readonly appService: AppService,
    private readonly toastrService: NbToastrService,
    private readonly usersService: UsersService,
  ) { }

  public updatePersonalData(personalData: Omit<UserProfile, 'id'>): Observable<UserProfile> {
    const userId = this.appService.currentUserProfileSnapshot!.id;
    return this.usersService.updateUserProfile({ ...personalData, id: userId })
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.danger(
            err.error?.message ?? DEFAULT_UPDATE_PROFILE_ERROR_MESSAGE,
            DEFAULT_SAVED_ERROR_MESSAGE,

          ),
          next: (user) => {
            this.toastrService.success(PROFILE_UPDATED_DEFAULT_MESSAGE, DEFAULT_SAVED_MESSAGE);
            this.appService.startUserSession(user);
          },
        })
      )
  }
}
