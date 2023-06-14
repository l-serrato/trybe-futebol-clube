// import MatchesModel from '../models/matchModel';
// import { Match } from '../Interfaces/matches';
import Match from '../database/models/matches';
import Team from '../database/models/teams';
// import { matchModel } from '../Interfaces/matchModel';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';

const config = {
  include: [
    {
      model: Team,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: Team,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
};

class MatchService {
  public findAll = async () => {
    const matches = await Match.findAll({ ...config });
    return { status: 200, data: matches };
  };
}

export default MatchService;
/* export default class MatchService {
  constructor(
    private MatchModel: matchModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<Match[]>> {
    const allMatches = await this.MatchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<Match>> {
    const Match = await this.MatchModel.findById(id);
    if (!Match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: Match };
  }
}
 */
