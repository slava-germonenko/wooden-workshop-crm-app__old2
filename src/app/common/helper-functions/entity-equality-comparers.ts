import { UserProfile } from '@common/interfaces/entities';

export function userProfilesAreEqual(u1: UserProfile | null, u2: UserProfile | null): boolean {
  if (u1 === null || u2 === null) {
    return false;
  }

  return u1.firstName === u2.firstName
    &&  u1.lastName === u2.lastName
    && u1.emailAddress === u2.emailAddress;
}
