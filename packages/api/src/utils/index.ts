import tokenGenerator from "../libs/TokenGenerator";

export const getUser = (token: string) => {
  try {
    const decoded: any = tokenGenerator.verify(token);
    const claims = decoded["https://hasura.io/jwt/claims"];

    return {
      id: claims["X-Hasura-User-Id"],
      ...claims,
    };
  } catch (err) {
    return null;
  }
};

export const getCookie = (cookieStr: string | undefined, key: string) => {
  const cookie = cookieStr
    ?.split(";")
    .filter((x) => x.trim().split("=")[0] === key)[0];
  if (!cookie) {
    return "";
  }
  return cookie.split("=")[1];
};
