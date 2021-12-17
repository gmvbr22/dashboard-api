export interface TokenGenerateOptions {
  id: string;
  role: string;
  device: string;
  expire: number;
}

export interface AccessTokenManager {
  /**
   * Generate new token access
   *
   * @param opt
   */
  generate(opt: TokenGenerateOptions): Promise<string>;

  /**
   * Validate token access
   */
  validate(token: string): Promise<TokenGenerateOptions>;
}
