import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  private teamService = new UserService();

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.teamService.login(email, password);

    if (user.message) {
      return res.status(401).json({ message: user.message });
    }

    return res.status(200).json({ token: user.data });
  };

  public getRole = async (req: Request, res: Response) => {
    const { role } = res.locals.data.payload;
    res.status(200).json({ role });
  };
}

export default UserController;
