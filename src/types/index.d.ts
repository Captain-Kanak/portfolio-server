import { DecodedToken } from "./auth.type.ts";

declare global {
  namespace Express {
    interface Request {
      admin?: DecodedToken;
    }
  }
}
