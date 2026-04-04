import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import ms, { StringValue } from "ms";
import { Request, Response } from "express";
import { DecodedToken } from "../types/auth.type.js";

const secret = env.JWT_SECRET;
const expiresIn = env.JWT_EXPIRES_IN;

const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, secret, {
    expiresIn: Math.floor(ms(expiresIn as StringValue) / 1000),
  });
};

const setTokenCookie = (res: Response, token: string) => {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: Math.floor(ms(expiresIn as StringValue)),
  });
};

const getTokenCookie = (req: Request, key: string) => {
  return req.cookies[key];
};

const verifyToken = (token: string) => {
  return jwt.verify(token, secret) as DecodedToken;
};

export const tokenUtils = {
  generateToken,
  setTokenCookie,
  getTokenCookie,
  verifyToken,
};
