import {sign, verify} from 'jsonwebtoken';
import Ajv, {ValidateFunction} from 'ajv';
import {AccessTokenManager, TokenGenerateOptions} from '../../application';

export class PayloadInvalidError extends Error {
  constructor() {
    super('payload is invalid or corrupted');
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

  public async generate(payload: TokenGenerateOptions): Promise<string> {
    const valid = this.isValidPayload(payload);
    if (!valid) {
      throw new PayloadInvalidError();
    }
    return sign(payload, this.secret);
  }

  public async verify(token: string): Promise<TokenGenerateOptions> {
    const payload = await verify(token, this.secret);
    const valid = this.isValidPayload(payload);
    if (!valid) {
      throw new PayloadInvalidError();
    }
    return payload as TokenGenerateOptions;
  }
}
