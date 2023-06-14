import { Match } from './matches';

export interface matchModel {
  findAll(): Promise<Match[]>,
  // findById(id: Match['id']): Promise<Match | null>
}
