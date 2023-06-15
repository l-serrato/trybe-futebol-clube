import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class LeaderboardController {
  private matchService = new MatchService();

  public getHome = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.generateLeaderboardHome();

    return res.status(status).json(data);
  };
}

export default LeaderboardController;
