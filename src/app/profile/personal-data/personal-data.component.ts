import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PersonalDataService } from './personal-data.service';
import { UserProfile } from '@common/interfaces/entities';
import { userProfilesAreEqual } from '@common/helper-functions';
import { PERSONAL_DATA_FORM_FIELDS } from '@app/profile/personal-data/constants';

@Component({
  selector: 'ww-personal-data',
  templateUrl: 'personal-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit {
  public readonly personalDataFormFields = [...PERSONAL_DATA_FORM_FIELDS];

  public loading = true;

  public personalData: UserProfile | null = null;

  public constructor(
    private readonly personalDataService: PersonalDataService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.personalDataService.personalData$.subscribe((personalData) => {
      this.personalData = personalData;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    })
  }

  public updateProfile(personalData: Record<string, any>): void {
    this.personalDataService.updatePersonalData(personalData as Omit<UserProfile, 'id'>).subscribe();
  }
}
