import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./jwt.js";
import { env } from "../config/env.js";
import ms, { StringValue } from "ms";
import { Response } from "express";
import { cookieUtils } from "./cookie.js";

const secret = env.JWT_SECRET;
const expiresIn = env.JWT_EXPIRES_IN;

const getToken = (payload: JwtPayload) => {
  return jwtUtils.createToken(payload, secret, {
    expiresIn: Math.floor(ms(expiresIn as StringValue) / 1000),
  });
};

const setTokenCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Math.floor(ms(expiresIn as StringValue)),
  });
};

const verifyToken = (token: string) => {
  return jwtUtils.verifyToken(token, secret);
};

export const tokenUtils = {
  getToken,
  setTokenCookie,
  verifyToken,
};
