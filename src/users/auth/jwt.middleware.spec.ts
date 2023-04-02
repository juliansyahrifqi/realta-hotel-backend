import { JwtMiddleware } from './jwt.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtMiddleware()).toBeDefined();
  });
});
