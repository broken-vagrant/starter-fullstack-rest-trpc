export const IS_PROD = process.env.NODE_ENV === "production";

// JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;
export const JWT_REFRESH_TOKEN_EXPIRES_IN =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

export const FINGERPRINT_COOKIE_NAME = "__Secure__User-Fgp";
export const FINGERPRINT_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
