import { GiveVoteEntity } from 'src/voting-users/give-vote.entity';
import { User } from '../users/user.entity';

export const votingUsersProviders = [
  { provide: 'VotingUsersRepository', useValue: GiveVoteEntity },
  { provide: 'UsersRepository', useValue: User },
];