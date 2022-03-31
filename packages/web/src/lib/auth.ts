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

export const preFetch = async () => {
  // refresh token
  await tokenRefresher.refresh();
};
