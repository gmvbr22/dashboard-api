import {PasswordManager} from './application';
import {BcryptAdapter} from './infrastructure';

export class Container {
  public readonly security: {
    password: PasswordManager;
  };

  constructor() {
    this.security = {
      password: new BcryptAdapter(12),
    };
  }
}
