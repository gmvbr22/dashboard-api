import {BcryptAdapter} from '..';

describe('BcryptAdapter', () => {
  test('should generate an encrypted password', async () => {
    const adapter = new BcryptAdapter(12);
    const encrypted = await adapter.hash('password');
    expect(encrypted).toHaveLength(60);
  });

  test('should compare the hash with the encrypted', async () => {
    const adapter = new BcryptAdapter(12);
    const encrypted = await adapter.hash('password');
    expect(encrypted).toHaveLength(60);
    expect(await adapter.compare('wrong password', encrypted)).toBeFalsy();
    expect(await adapter.compare('password', encrypted)).toBeTruthy();
  });
});
