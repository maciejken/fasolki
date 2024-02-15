import { Status } from "../../types";

export interface AuthState {
  status: Status;
  token: string | null;
}

export interface JwtPayload {
  sub: string;
}