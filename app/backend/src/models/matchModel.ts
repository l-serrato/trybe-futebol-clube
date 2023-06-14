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

  /*  async findById(id: Match['id']): Promise<Match | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { MatchName }: Match = dbData;
    return { id, MatchName };
  } */
}
