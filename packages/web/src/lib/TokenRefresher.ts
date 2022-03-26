import decodeJWT, { JwtPayload } from 'jwt-decode';
import { BACKEND_URL } from '~/constants';
import {
  getJwtToken,
  getRefreshToken,
  removeJwtTokens,
  setJwtToken,
} from '~/utils/jwt';
import { transformer } from '~/utils/trpc';

export default class TokenRefresher {
  private retryCount: number;
  private currRetryCount: number;
  constructor(retryCount: number) {
    this.retryCount = retryCount;
    this.currRetryCount = 0;
  }

  isTokenValidOrUndefined() {
    console.log('isTokenValidOrUndefined');
    const token = getJwtToken();

    // If there is no token, the user is not logged in
    // We return true here, because there is no need to refresh the token
    if (!token) return true;

    // Otherwise, we check if the token is expired
    const claims: JwtPayload = decodeJWT(token);
    const expirationTimeInSeconds = claims.exp
      ? claims.exp * 1000
      : Number.NEGATIVE_INFINITY;
    const now = new Date();
    const isValid = expirationTimeInSeconds >= now.getTime();

    // Return true if the token is still valid, otherwise false and trigger a token refresh
    return isValid;
  }
  private async fetchToken() {
    try {
      const jwt: any = decodeJWT(getJwtToken() || '');
      console.log('fetchAccessToken jwt:', jwt);

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.warn('refresh token not found');
        return;
      }
      const fingerPrintHash =
        jwt?.['https://hasura.io/jwt/claims']?.['X-User-Fingerprint'];

      const request = await fetch(`${BACKEND_URL}/trpc/user.refreshToken`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          transformer.serialize({
            refreshToken,
            fingerPrintHash,
          })
        ),
      });
      const data = await request.json();

      if (data?.result?.data?.json?.jwt) {
        setJwtToken(data.result.data.json.jwt);
      } else {
        removeJwtTokens();
      }
    } catch (err) {
      console.error(err);

      console.warn('Your refresh token is invalid. Try to reauthenticate.');
      removeJwtTokens();
    }
  }
  async refresh() {
    if (this.currRetryCount >= this.retryCount) {
      return;
    }
    if (!this.isTokenValidOrUndefined()) {
      this.currRetryCount += 1;
      await this.fetchToken();
    }
  }
}
