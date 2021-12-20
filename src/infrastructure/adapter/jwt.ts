import {sign, verify} from 'jsonwebtoken';
import Ajv, {ValidateFunction} from 'ajv';
import {AccessTokenManager, TokenGenerateOptions} from '../../application';

export class MissingParamsError extends Error {
  constructor() {
    super('Missing params');
  }
}

export class JWTAdapter implements AccessTokenManager {
  private secret: string;
  private isValidPayload: ValidateFunction;

  public constructor(secret: string) {
    this.secret = secret;
    this.isValidPayload = new Ajv().compile({
      type: 'object',
      properties: {
        exp: {type: 'integer'},
        sub: {type: 'string'},
        role: {type: 'string'},
        device: {type: 'string'},
        iat: {type: 'integer'},
      },
      required: ['exp', 'sub', 'role', 'device'],
      additionalProperties: false,
    });
  }

  public async generate(options: TokenGenerateOptions): Promise<string> {
    const valid = this.isValidPayload(options);
    if (!valid) {
      throw new MissingParamsError();
    }
    return sign(options, this.secret);
  }

  public async validate(tokenStr: string): Promise<TokenGenerateOptions> {
    const token = (await verify(tokenStr, this.secret)) as TokenGenerateOptions;
    const valid = this.isValidPayload(token);
    if (!valid) {
      throw new MissingParamsError();
    }
    return token;
  }
}
