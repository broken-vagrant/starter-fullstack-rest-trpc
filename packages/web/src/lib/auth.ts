import { getJwtToken } from '~/utils/jwt';
import TokenRefresher from './TokenRefresher';

export const tokenRefresher = new TokenRefresher(1);

export function getHeaders() {
  /**
   * set fetcher's default headers in this function
   */
  const headers: HeadersInit = {};
  const token = getJwtToken();

  if (token) headers['authorization'] = `Bearer ${token}`;
  headers['content-type'] = 'application/json';
  return headers;
}

export const getFetchOptions = async (): Promise<RequestInit> => {
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
