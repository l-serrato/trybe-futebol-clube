import Matches from '../database/models/matches';
import Team from '../database/models/teams';
import { NewMatch } from '../Interfaces/matches';
import TeamBoard from '../models/boardModel';

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

const sameTeamMessage = 'It is not possible to create a match with two equal teams';

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

  public setFinish = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: '"Finished"' };
  };

  public updatedMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 200, message: '"Updated"' };
  };

  public getTeamById = async (id: string) => {
    const team = await Team.findByPk(id);

    if (!team) {
      return null;
    }
  };

  public addMatch = async (data: NewMatch) => {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: sameTeamMessage };
    }
    const existingTeams = await Team.findByPk(homeTeamId) && await Team.findByPk(awayTeamId);
    if (!existingTeams) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const match = await Matches.create({ ...data, inProgress: true });
    return { status: 201, data: match };
  };

  public generateLeaderboardHome = async () => {
    const teams = await Team.findAll();
    const matches = await Matches.findAll({ ...config, where: { inProgress: false } });
    const generalMatches: TeamBoard[] = [];

    teams.forEach(({ id, teamName }) => {
      const filteredMatches = matches
        .filter(({ homeTeamId }) => homeTeamId === id)
        .map(({ homeTeamGoals, awayTeamGoals }) => ({
          goalsFavor: homeTeamGoals,
          goalsOwn: awayTeamGoals }));

      generalMatches.push(new TeamBoard(teamName, filteredMatches));
    });

    return { status: 200, data: TeamBoard.sortLeaderBoard(generalMatches as TeamBoard[]) };
  };

  public generateLeaderBoard = async () => {
    const teams = await Team.findAll();
    const matches = await Matches.findAll();
    const generalMatches: TeamBoard[] = [];

    teams.forEach(({ id, teamName }) => {
      const homeMatches = matches
        .filter(({ homeTeamId }) => homeTeamId === id)
        .map(({ homeTeamGoals, awayTeamGoals }) => ({
          goalsFavor: homeTeamGoals,
          goalsOwn: awayTeamGoals }));

      const awayMatches = matches
        .filter(({ awayTeamId }) => awayTeamId === id)
        .map(({ homeTeamGoals, awayTeamGoals }) => ({
          goalsFavor: awayTeamGoals,
          goalsOwn: homeTeamGoals }));

      const HomeAndAwayMatch = new TeamBoard(teamName, [...homeMatches, ...awayMatches]);
      generalMatches.push(HomeAndAwayMatch);
    });

    return { status: 200, data: TeamBoard.sortLeaderBoard(generalMatches as TeamBoard[]) };
  };
}

export default MatchService;
