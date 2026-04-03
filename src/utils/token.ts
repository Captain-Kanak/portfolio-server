import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./jwt.js";
import { env } from "../config/env.js";
import ms, { StringValue } from "ms";

const secret = env.JWT_SECRET;
const expiresIn = env.JWT_EXPIRES_IN;

const getToken = (payload: JwtPayload) => {
  return jwtUtils.createToken(payload, secret, {
    expiresIn: ms(expiresIn as StringValue) / 1000,
  });
};

const verifyToken = (token: string) => {
  return jwtUtils.verifyToken(token, secret);
};

export const tokenUtils = {
  getToken,
  verifyToken,
};
