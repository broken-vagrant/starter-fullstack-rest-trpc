export type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };
