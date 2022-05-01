export interface AccessToken {
  token: string;
  userId: string;
  expireDate: string;
}

export interface RefreshToken {
  refreshToken: string;
  expireDate: string;
  crmUserId: string;
}

export interface AuthorizationResult {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
