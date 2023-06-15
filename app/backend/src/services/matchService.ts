import Matches from '../database/models/matches';
import Team from '../database/models/teams';

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
    const matches = await Matches.findAll({ ...config });
    return { status: 200, data: matches };
  };

  public getInProgress = async (query: string) => {
    const listInProgress = query === 'true';
    const matches = await Matches.findAll({ ...config, where: { inProgress: listInProgress } });
    return { status: 200, data: matches };
  };
}

export default MatchService;
