import { Voting } from './voting.entity';

export const votingsProviders = [
  { provide: 'VotingRepository', useValue: Voting },
];
