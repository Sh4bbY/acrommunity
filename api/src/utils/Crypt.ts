import {compare, genSalt, hash} from 'bcrypt';

export class Crypt {
  private static SALT_ROUNDS = 10;

  public static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(Crypt.SALT_ROUNDS);
    return await hash(password, salt);
  }

  public static async validatePassword(candidate: string, saltedHash: string): Promise<boolean> {
    return await compare(candidate, saltedHash);
  }
}
