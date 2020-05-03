import { Vote } from './vote.entity';

export const voteProviders = [{ provide: 'VoteRepository', useValue: Vote }];