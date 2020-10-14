import { giveVoteEntity } from 'src/voting-users/give-vote.entity';

export const votingsUsersProviders = [
  { provide: 'VotingUsersRepository', useValue: giveVoteEntity },
];