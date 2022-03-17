import { sessionChannel } from "~/lib/broadcast";

export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}
export function setAuthLastModifiedAt(time: number) {
  sessionStorage.setItem("jwt-iat", time.toString());
}
export function getAuthLastModifiedAt() {
  return sessionStorage.getItem("jwt-iat");
}
export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
  setAuthLastModifiedAt(Date.now());
  sessionChannel.postMessage({
    type: "set-jwt",
    payload: token,
  });
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function setRefreshToken(token: string) {
  sessionStorage.setItem("refreshToken", token);
  sessionChannel.postMessage({
    type: "set-refreshToken",
    payload: token,
  });
}

export function removeJwtTokens() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
}
