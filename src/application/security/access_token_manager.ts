export interface TokenGenerateOptions {
  sub: string;
  role: string;
  device: string;
  exp: number;
}

export interface AccessTokenManager {
  /**
   * Generate new token access
   */
  generate(opt: TokenGenerateOptions): Promise<string>;

  /**
   * Validate token access
   */
  verify(token: string): Promise<TokenGenerateOptions>;
}
