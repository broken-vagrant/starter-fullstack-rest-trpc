import { getJwtToken } from '~/utils/jwt';
import TokenRefresher from './TokenRefresher';

export const tokenRefresher = new TokenRefresher(1);

export function getHeaders() {
  /**
   * set fetcher's default headers in this function
   */
  const headers: HeadersInit = {};
  const token = getJwtToken();
  console.log({ token });

  if (token) headers['authorization'] = `Bearer ${token}`;
  return headers;
}

export const getFetchOptions = async (): Promise<RequestInit> => {
  // info: set default fetch request params in return {...params}

  // refresh token
  await tokenRefresher.refresh();

  return {
    method: 'POST',
    // credentials: "include" is REQUIRED for cookies to work
    credentials: 'include',
  };
};
