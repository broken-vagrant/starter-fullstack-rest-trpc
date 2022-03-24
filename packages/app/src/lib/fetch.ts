import decodeJWT, { JwtPayload } from 'jwt-decode';
import {
  getJwtToken,
  getRefreshToken,
  removeJwtTokens,
  setJwtToken,
} from '@/utils/jwt';

export const endpointUrl = import.meta.env['VITE_BACKEND_URL'];

class TokenRefresher {
  retryCount: number;
  currRetryCount: number;
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
  async fetch() {
    try {
      const jwt: any = decodeJWT(getJwtToken() || '');
      console.log('fetchAccessToken jwt:', jwt);

      const refreshToken = getRefreshToken();
      const fingerPrintHash =
        jwt?.['https://hasura.io/jwt/claims']?.['X-User-Fingerprint'];

      const request = await fetch(import.meta.env['VITE_BACKEND_URL'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: "include" is REQUIRED for cookies to work
        credentials: 'include',
        body: JSON.stringify({
          query: `
                  mutation RefreshJwtToken($data: RefreshTokenInput!) {
                    refreshToken(data: $data) {
                      jwt
                    }
                  }
                `,
          variables: {
            data: {
              refreshToken,
              fingerPrintHash,
            },
          },
        }),
      });

      const result = await request.json();
      const accessToken = result.data.refreshToken.jwt;
      if (accessToken) {
        // const claims = decodeJWT(accessToken);
        setJwtToken(accessToken);
      } else {
        removeJwtTokens();
      }
    } catch (err) {
      console.warn('Your refresh token is invalid. Try to reauthenticate.');
      removeJwtTokens();
    }
  }
  async refresh() {
    if (this.retryCount === this.currRetryCount) {
      return;
    }
    if (!this.isTokenValidOrUndefined()) {
      this.currRetryCount += 1;
      await this.fetch();
    }
  }
}
function getHeaders() {
  /**
   * set fetcher's default headers in this function
   */
  const headers: HeadersInit = {};
  const token = getJwtToken();

  if (token) headers['authorization'] = `Bearer ${token}`;
  headers['content-type'] = 'application/json';
  return headers;
}
const tokenRefresher = new TokenRefresher(1);

export const fetchParams = async (): Promise<RequestInit> => {
  // info: set default fetch request params in return {...params}

  // refresh token
  await tokenRefresher.refresh();

  return {
    // credentials: "include" is REQUIRED for cookies to work
    credentials: 'include',
    headers: {
      ...getHeaders(),
    },
  };
};

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
      method: 'POST',
      ...(await fetchParams()),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message, extensions } = json.errors[0];
      if (extensions && extensions.code === 'INTERNAL_SERVER_ERROR') {
        throw new Error('Something went wrong!');
      }
      throw new Error(message);
    }

    return json.data;
  };
}
