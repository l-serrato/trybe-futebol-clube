import { TeamGoals } from '../Interfaces/Leaderboard';

class TeamBoard {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: string;

  constructor(name: string, goalsByMatch: TeamGoals[]) {
    this.name = name;
    this.totalPoints = this.getTotalPoints(goalsByMatch);
    this.totalGames = goalsByMatch.length;
    this.totalVictories = this.getPointsMatch(goalsByMatch).pointsVictories;
    this.totalDraws = this.getPointsMatch(goalsByMatch).pointsDraw;
    this.totalLosses = this.getPointsMatch(goalsByMatch).pointsLosses;
    this.goalsFavor = this.getTotalGoalsFavor(goalsByMatch);
    this.goalsOwn = this.getTotalGoalsOwn(goalsByMatch);
    this.goalsBalance = this.getGoalsBalance();
    this.efficiency = this.getEfficiencyTeam().toString();
  }

  getTotalPoints = (goalsByMatch: TeamGoals[]) =>
    goalsByMatch.reduce((total, { goalsFavor, goalsOwn }) => {
      let totalPoints = 0;
      if (goalsFavor > goalsOwn) totalPoints += 3;
      if (goalsFavor === goalsOwn) totalPoints += 1;
      return total + totalPoints;
    }, 0);

  getPointsMatch = (goalsByMatch: TeamGoals[]) => {
    const pointsVictories = goalsByMatch.reduce((total, { goalsFavor, goalsOwn }) => {
      let sumVictories = 0; if (goalsFavor > goalsOwn) sumVictories += 1;
      return total + sumVictories;
    }, 0);

    const pointsDraw = goalsByMatch.reduce((total, { goalsFavor, goalsOwn }) => {
      let sumDraws = 0; if (goalsOwn === goalsFavor) sumDraws += 1;
      return total + sumDraws;
    }, 0);

    const pointsLosses = goalsByMatch.reduce((total, { goalsFavor, goalsOwn }) => {
      let sumLosses = 0; if (goalsOwn > goalsFavor) sumLosses += 1;
      return total + sumLosses;
    }, 0);

    return { pointsVictories, pointsDraw, pointsLosses };
  };

  getTotalGoalsFavor = (goalsByMatch: TeamGoals[]) =>
    goalsByMatch.reduce((total, { goalsFavor }) => total + goalsFavor, 0);

  getTotalGoalsOwn = (goalsByMatch: TeamGoals[]) =>
    goalsByMatch.reduce((total, { goalsOwn }) => goalsOwn + total, 0);

  getGoalsBalance = (): number => this.goalsFavor - this.goalsOwn;

  getEfficiencyTeam = () => ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
}

export default TeamBoard;
