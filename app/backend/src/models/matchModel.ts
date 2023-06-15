import match from '../database/models/matches';
import { Match } from '../Interfaces/matches';
import { matchModel } from '../Interfaces/matchModel';

export default class MatchesModel implements matchModel {
  private model = match;

  async findAll(): Promise<Match[]> {
    const dbData = await this.model.findAll();
    return dbData
      .map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
        { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
      ));
  }
}
