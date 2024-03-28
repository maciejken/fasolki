export interface JwtPayload {
  exp?: number;
  sub?: string;
}

export type StaticRoute =
  | "/"
  | "/fasolki/";

export type RouteTemplate =
  | "/fasolki/[id]/share"
  | "/fasolki/[id]/delete";
