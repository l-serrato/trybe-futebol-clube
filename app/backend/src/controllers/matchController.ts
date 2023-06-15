import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(
    private MatchesService: MatchService = new MatchService(),
  ) { }

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let listMatches;

    if (inProgress) {
      listMatches = await this.MatchesService.getInProgress(String(inProgress));
    } else {
      listMatches = await this.MatchesService.findAll();
    }
    const { status, data } = listMatches;
    res.status(status).json(data);
  };
}
