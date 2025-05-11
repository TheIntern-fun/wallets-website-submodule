"use server";
import jwt from "jsonwebtoken";

export async function getUserInfo(token: string) {
  const jwtPublicKey = process.env.PRIVY_JWT_PUBLIC_KEY || "";

  try {
    const decoded = jwt.verify(token, jwtPublicKey, {
      algorithms: ["ES256"],
    });
    console.log(decoded);

    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}
