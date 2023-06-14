import * as bcrypt from 'bcryptjs';
import Authenticator from '../utils/auth';
import User from '../database/models/users';

class UserService {
  private tokenService = new Authenticator();

  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { message: 'Invalid email or password' };
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      return { message: 'Invalid email or password' };
    }

    const token = await this.tokenService.generateToken({ id: user.id, role: user.role });

    return { status: 200, data: token };
  };
}

export default UserService;
