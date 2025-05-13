"use server";
import jwt from "jsonwebtoken";
import { privy } from "@/lib/privy";

export async function getUserInfo(token: string) {
  const jwtPublicKey = process.env.PRIVY_JWT_PUBLIC_KEY || "";

  try {
    const decoded = jwt.verify(token, jwtPublicKey, {
      algorithms: ["ES256"],
    }) as {
      sid: string;
      iss: string;
      iat: number;
      aud: string;
      sub: string;
      exp: number;
    };
    console.log(decoded);

    await privy.importUser({
      linkedAccounts: [
        {
          type: "twitter_oauth",
          username: "",
          subject: "",
          name: "",
        },
      ],
      createSolanaWallet: true,
    });

    const user = await privy.getUserById(decoded.sub);
    if (user.twitter) {
      console.log(user.twitter);
    }

    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}
