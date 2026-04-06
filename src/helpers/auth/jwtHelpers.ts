import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime?: SignOptions["expiresIn"], // optional করলাম
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    ...(expireTime !== undefined && { expiresIn: expireTime }), // ✅ conditionally add
  };

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
