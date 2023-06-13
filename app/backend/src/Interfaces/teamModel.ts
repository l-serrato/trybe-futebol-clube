import { Team } from './teams';

export interface teamModel {
  findAll(): Promise<Team[]>,
  findById(id: Team['id']): Promise<Team | null>
}