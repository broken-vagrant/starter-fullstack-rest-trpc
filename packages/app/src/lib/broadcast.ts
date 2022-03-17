import { BroadcastChannel } from "broadcast-channel";

export type Action<T = undefined, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

export type SessionChannelActions =
  | Action<"new-user">
  | Action<"session-data", string>
  | Action<"set-jwt", string>
  | Action<"set-refreshToken", string>
  | Action<"logout">;

export const sessionChannel: BroadcastChannel<SessionChannelActions> =
  new BroadcastChannel("session");
