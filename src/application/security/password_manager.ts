export interface PasswordManager {
  /**
   * Gera uma senha criptografada com base
   * na senha em texto plano
   *
   * @param data Senha em texto plano
   */
  hash(data: string): Promise<string>;

  /**
   * Valida a senha
   *
   * @param data Senha em texto plano
   * @param encrypted Senha criptografada
   */
  compare(data: string, encrypted: string): Promise<boolean>;
}
