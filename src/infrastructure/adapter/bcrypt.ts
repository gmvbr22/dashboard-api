import {compareSync, hashSync} from 'bcrypt';
import {PasswordManager} from '../../application';

export class BcryptAdapter implements PasswordManager {
  private rounds: number;

  public constructor(rounds: number) {
    this.rounds = rounds;
  }

  public async hash(data: string): Promise<string> {
    return hashSync(data, this.rounds);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return compareSync(data, encrypted);
  }
}
