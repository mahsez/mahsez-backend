import bcrypt from "bcrypt";

export const hashedPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;

  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (error) {
    throw new Error(`Password hashing failed: ${(error as Error).message}`);
  }
};
