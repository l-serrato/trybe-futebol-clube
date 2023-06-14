import { Request, Response } from 'express';
import MatchService from '../services/matchService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private MatchesService: MatchService = new MatchService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.MatchesService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }

  /* public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.TeamsService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  } */
}
