import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

class Authenticator {
  public generateToken = async (payload: jwt.JwtPayload): Promise<string> => {
    const token = jwt.sign({ payload }, secret, { expiresIn: '1d' });
    return token;
  };

  public static validateToken = async (token: string): Promise<jwt.JwtPayload | string> => {
    try {
      return jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  };
}

export default Authenticator;
