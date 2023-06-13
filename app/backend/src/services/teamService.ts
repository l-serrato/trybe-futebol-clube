import teamsModel from '../models/teamModel';
import { Team } from '../Interfaces/teams';
import { teamModel } from '../Interfaces/teamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class teamService {
  constructor(
    private TeamModel: teamModel = new teamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<Team[]>> {
    const allTeams = await this.TeamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<Team>> {
    const team = await this.TeamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}