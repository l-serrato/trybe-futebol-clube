import { Match } from './matches';

export interface matchModel {
  findAll(): Promise<Match[]>,
}
