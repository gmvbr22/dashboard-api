export interface TokenGenerateOptions {
  sub: string;
  role: string;
  device: string;
  exp: number;
}

export interface AccessTokenManager {
  /**
   * Gera um token de acesso
   */
  generate(opt: TokenGenerateOptions): Promise<string>;

  /**
   * Verifica se o token de acesso está válido
   */
  verify(token: string): Promise<TokenGenerateOptions>;
}
