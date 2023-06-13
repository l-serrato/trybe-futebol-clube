import team from '../database/models/teams';
import { Team } from '../Interfaces/teams';
import { teamModel } from '../Interfaces/teamModel';

export default class teamsModel implements teamModel {
  private model = team;

  async findAll(): Promise<Team[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: Team['id']): Promise<Team | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: Team = dbData;
    return { id, teamName };
  }
}
