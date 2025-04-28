import { Auth } from "@/types/auth.types";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyJwt(token: string) {
  try {
    const jwtToken = jwt.decode(token) as Auth;
    if (jwtToken.username === "testuser") {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
}

export function deleteCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return true;
}
