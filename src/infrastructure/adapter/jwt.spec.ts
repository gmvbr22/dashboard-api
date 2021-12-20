/* eslint-disable @typescript-eslint/no-explicit-any */
import {sign, TokenExpiredError} from 'jsonwebtoken';
import {JWTAdapter, MissingParamsError} from './jwt';

const secret = 'test secret';
const payload = {
  sub: 'test',
  role: 'test',
  device: 'test',
  exp: Math.floor(Date.now() / 1000) + 60 * 60,
};
const adapter = new JWTAdapter(secret);

describe('JWTAdapter', () => {
  test('should generate a valid token', async () => {
    const token = await adapter.generate(payload);
    expect(token).not.toBeNull();
  });

  test('should not generate a valid token', async () => {
    await expect(adapter.generate(null as any)).rejects.toThrowError(
      MissingParamsError
    );
  });

  test('should accept the valid token', async () => {
    const token = await adapter.generate(payload);
    expect(token).not.toBeNull();

    const {sub, role, device, exp} = await adapter.validate(token);
    await expect({sub, role, device, exp}).toStrictEqual(payload);
  });

  test('should check the parameters of the token', async () => {
    await expect(adapter.validate(sign({}, secret))).rejects.toThrowError(
      MissingParamsError
    );
  });

  test('should check the token expiration', async () => {
    const token = await adapter.generate({
      ...payload,
      exp: Math.floor(Date.now() / 1000) - 60 * 60,
    });
    expect(token).not.toBeNull();
    await expect(adapter.validate(token)).rejects.toThrowError(
      TokenExpiredError
    );
  });
});