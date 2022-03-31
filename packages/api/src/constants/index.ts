export const IS_PROD = process.env.NODE_ENV === 'production';

export const FRONTEND_URL = 'http://localhost:3000';

// JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_TOKEN_EXPIRES_IN = 900000;
export const JWT_REFRESH_TOKEN_EXPIRES_IN = 900000;

export const getRefreshTokenExpiryTime = () => {
  if (!JWT_REFRESH_TOKEN_EXPIRES_IN)
    throw new Error('refresh token expiry not set');
  return Number(JWT_REFRESH_TOKEN_EXPIRES_IN);
};

export const FINGERPRINT_COOKIE_NAME = '__Secure__User-Fgp';
export const FINGERPRINT_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
