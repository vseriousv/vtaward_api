import { UserVotingEntity } from './entities/user-voting.entity';

export const userVotingProviders = [
  {provide: 'UserVotingRepository', useValue: UserVotingEntity},
];